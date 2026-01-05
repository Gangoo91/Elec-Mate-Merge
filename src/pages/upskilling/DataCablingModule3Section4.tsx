import { useEffect, useMemo } from 'react';
import { ArrowLeft, Route, Activity, Ruler, Gauge, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import type { QuizQuestion } from '@/types/quiz';

const DataCablingModule3Section4 = () => {
  // SEO
  useEffect(() => {
    const title = 'Loss Budgets & OTDR Basics | Module 3 Sec 4';
    document.title = title;
    const desc = 'Calculate optical loss budgets and understand OTDR testing. Practical examples, typical values, test setup, and pass/fail guidance.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      (meta as HTMLMetaElement).name = 'description';
      document.head.appendChild(meta);
    }
    (meta as HTMLMetaElement).content = desc;

    // Canonical
    const href = window.location.origin + '/data-cabling-module-3-section-4';
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = href;
  }, []);

  // Quiz Data
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Typical singlemode attenuation at 1310nm is:',
      options: ['0.1 dB/km', '0.35 dB/km', '1.5 dB/km', '3.5 dB/km'],
      correctAnswer: 1,
      explanation: 'OS2 singlemode attenuation is typically 0.35 dB/km at 1310nm (and ~0.25 dB/km at 1550nm).'
    },
    {
      id: 2,
      question: 'Which combination is needed to calculate a link loss budget?',
      options: ['Cable length only', 'Connectors and splices only', 'Fibre attenuation + connector losses + splice losses + margin', 'OTDR trace only'],
      correctAnswer: 2,
      explanation: 'A complete loss budget includes fibre attenuation, connector and splice losses, and a design margin.'
    },
    {
      id: 3,
      question: 'What is an OTDR dead zone?',
      options: ['A zone where fibres cannot be connected', 'A section near the instrument where events cannot be resolved', 'The part of fibre with no attenuation', 'A fault that stops all transmission'],
      correctAnswer: 1,
      explanation: 'The dead zone is the region after the launch pulse where near-end events are not resolvable; use launch/receive leads.'
    },
    {
      id: 4,
      question: 'Why use both launch and receive fibres for OTDR tests?',
      options: ['To increase measured loss', 'To reduce wavelength', 'To characterise the first and last connectors accurately', 'To avoid using a power meter'],
      correctAnswer: 2,
      explanation: 'Launch and receive leads allow the OTDR to separate the first and last connectors from the dead zones for accurate measurement.'
    },
    {
      id: 5,
      question: 'A 2 km OS2 link with two connectors (0.3 dB each) and one fusion splice (0.1 dB) has what expected loss at 1310nm?',
      options: ['0.8 dB', '1.0 dB', '1.3 dB', '2.0 dB'],
      correctAnswer: 2,
      explanation: 'Fibre: 2 km × 0.35 dB/km = 0.70 dB; connectors: 0.6 dB; splice: 0.1 dB; total ≈ 1.4 dB. Closest answer: 1.3 dB.'
    }
  ], []);

  const sequentialQuestions = useMemo(
    () => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })),
    [questions]
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../data-cabling-module-3">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <Route className="h-6 w-6 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-semibold">
              Section 4
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Loss Budgets and OTDR Basics
          </h1>
          <p className="text-base text-gray-400 max-w-3xl">
            Practical loss calculations, test setup and trace interpretation
          </p>
        </div>

        <div className="space-y-8 mt-8">
          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-yellow-400" />
                Why loss budgets matter
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Loss budgets confirm whether a link will support the intended application before equipment is connected. 
                They combine fibre attenuation, connector and splice losses, and a design margin for ageing and maintenance.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-2">Typical Attenuation Values:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Multimode 850nm: <span className="text-white">3.5 dB/km</span> | 1300nm: <span className="text-white">1.5 dB/km</span></li>
                  <li>• Singlemode 1310nm: <span className="text-white">0.35 dB/km</span> | 1550nm: <span className="text-white">0.25 dB/km</span></li>
                  <li>• Connector (Grade A): <span className="text-white">≤0.3 dB</span> each</li>
                  <li>• Fusion splice: <span className="text-white">≤0.1 dB</span></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-3">After this section, you will be able to:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Build a complete loss budget with design margin</li>
                  <li>• Use OTDR with launch/receive fibres correctly</li>
                  <li>• Identify events on traces and estimate losses</li>
                  <li>• Set pass/fail thresholds and document results</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Loss Budget Calculation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Ruler className="h-5 w-5 text-yellow-400" />
                Building a Loss Budget (Example)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Example: 550 m OM4 link, two connectors (0.3 dB each), no splices, VCSEL @ 850 nm.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">Step-by-step</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-300">
                    <li>Fibre attenuation: 0.55 km × 3.5 dB/km = 1.93 dB</li>
                    <li>Connector losses: 2 × 0.3 dB = 0.6 dB</li>
                    <li>Splice losses: 0 dB</li>
                    <li>Design margin: 1.0 dB</li>
                    <li>Total budget: 1.93 + 0.6 + 0 + 1.0 = 3.53 dB</li>
                  </ol>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">Practical Guidance</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Use manufacturer data for exact attenuation</li>
                    <li>• Add 0.1 dB per planned fusion splice</li>
                    <li>• Maintain connector Grade A targets (≤0.3 dB)</li>
                    <li>• Keep 1–3 dB margin, depending on criticality</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OTDR Basics */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-5 w-5 text-yellow-400" />
                OTDR Setup and Trace Reading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">An OTDR sends optical pulses and measures backscatter to map events along a fibre. Proper setup is essential.</p>
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Essential Setup</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-2">Test Configuration</p>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Use launch and receive leads</li>
                        <li>• Select wavelength(s): 850/1300 nm MM, 1310/1550 nm SM</li>
                        <li>• Choose pulse width for link length</li>
                        <li>• Set index of refraction per cable datasheet</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Interpreting Traces</p>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Connector: reflective spike at an event</li>
                        <li>• Splice: small non-reflective step</li>
                        <li>• Break: large reflective end event</li>
                        <li>• Macro-bend: gradual slope increase</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-600/20 border border-yellow-400/30 p-4 rounded-lg">
                  <p className="text-yellow-400 text-sm"><strong>Pro tip:</strong> Take bi-directional traces and average results for accurate splice loss estimation.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warnings */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Common Pitfalls & Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">Avoid These</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Skipping launch/receive leads</li>
                    <li>• Using wrong pulse width for short links</li>
                    <li>• Ignoring back reflection limits</li>
                    <li>• Misreading ghost reflections</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">Record Keeping</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Save traces (both directions) and PDFs</li>
                    <li>• Document fibre IDs, wavelengths, settings</li>
                    <li>• Keep pass/fail thresholds and summaries</li>
                    <li>• Align with warranty and client handover packs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bi-directional Testing & Reporting */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-yellow-400" />
                Bi-directional Testing & Reporting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Combine tests in both directions to average splice loss and reduce connector reflectance bias.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">Reporting Checklist</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Link IDs, core numbers, wavelengths</li>
                    <li>• Test settings (pulse width, range, IOR)</li>
                    <li>• Equipment model, serial and calibration</li>
                    <li>• Pass/fail criteria and summary table</li>
                  </ul>
                </div>
                <div className="bg-yellow-400/10 border border-yellow-400/30 p-4 rounded-lg">
                  <p className="text-foreground text-sm"><strong className="text-yellow-400">Tip:</strong> Export .sor files and a PDF bundle; store centrally for maintenance teams.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Check</CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz questions={sequentialQuestions} title="Loss Budgets & OTDR Quiz" />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../data-cabling-module-3-section-3">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <Link to="../data-cabling-module-3-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
                Next
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule3Section4;