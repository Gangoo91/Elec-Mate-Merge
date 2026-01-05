import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Gauge, FileText, Wrench, Shield } from 'lucide-react';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import type { QuizQuestion } from '@/types/quiz';

const DataCablingModule3Section5 = () => {
  // SEO: title, description, canonical, structured data
  useEffect(() => {
    const title = 'Module 3 · Section 5 | Fibre Testing & Certification (OLTS/OTDR)';
    const description =
      'Practical OLTS and OTDR testing for fibre links: setup, launch/tail leads, pass/fail limits, trace interpretation, and BS-aligned documentation.';

    document.title = title;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + '/data-cabling-module-3-section-5';

    // JSON-LD Article
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Fibre Testing & Certification (OLTS/OTDR)',
      description,
      inLanguage: 'en-GB'
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Quiz Data
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Which reference method can include test cords at both ends?',
      options: ['1-jumper', '2-jumper', '3-jumper', 'No reference needed'],
      correctAnswer: 2,
      explanation: '3-jumper includes test cords at both ends and best represents patching in service.'
    },
    {
      id: 2,
      question: 'Why are launch and tail fibres used with an OTDR?',
      options: ['To reduce wavelength', 'To characterise first/last connectors beyond dead zones', 'To increase loss', 'They are optional cosmetics'],
      correctAnswer: 1,
      explanation: 'They move the dead zones so the first and last connectors can be measured accurately.'
    },
    {
      id: 3,
      question: 'Typical good fusion splice loss is:',
      options: ['~0.8 dB', '~0.5 dB', '~0.1 dB', '~1.0 dB'],
      correctAnswer: 2,
      explanation: 'A quality fusion splice is usually around 0.05–0.1 dB.'
    },
    {
      id: 4,
      question: 'For a short link, choose a pulse width that is:',
      options: ['Very long to see far events', 'Short to improve near-end resolution', 'Any value is fine', 'Based on connector colour'],
      correctAnswer: 1,
      explanation: 'Short pulse widths improve near-end event resolution and reduce dead zones.'
    },
    {
      id: 5,
      question: 'Pass/fail limits for OLTS should be set from:',
      options: ['Installer preference', 'Random default', 'The design loss budget', 'OTDR auto mode only'],
      correctAnswer: 2,
      explanation: 'Use the pre-calculated loss budget so OLTS thresholds are meaningful and auditable.'
    }
  ], []);

  const sequentialQuestions = useMemo(
    () => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })),
    [questions]
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../data-cabling-module-3">
          <Button variant="ghost" className="bg-card text-white hover:text-yellow-400 transition-all duration-200 mb-4 px-4 py-2 rounded-md">
            Back
          </Button>
        </Link>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Activity className="h-7 w-7 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 font-semibold text-xs px-2 py-0.5 border-0">
              Module 3 · Section 5
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Fibre Testing & Certification (OLTS/OTDR)</h1>
          <p className="text-base text-gray-400 max-w-3xl">
            End-to-end loss testing, OTDR configuration and trace reading, and recording compliant results for handover.
          </p>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Colour splash callout */}
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-md p-4 flex items-start gap-3">
            <Shield className="h-5 w-5 text-yellow-400 mt-0.5" />
            <p className="text-foreground text-sm">Clean, inspect, then connect. Record calibration details and use bi-directional tests for confidence.</p>
          </div>
          {/* Introduction */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                Correct testing proves a link meets its designed service class. This section focuses on two core approaches:
                OLTS (Optical Loss Test Set) for end-to-end attenuation and OTDR for characterising events along the fibre. We
                align with good practice from BS EN 50174/50173 and ensure electrical separation/segregation principles are
                consistent with BS 7671 when installing and routing near LV systems.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Choose correct test wavelengths (e.g., 1310/1550 nm for SM; 850/1300 nm for MM).</li>
                <li>Use calibrated, traceable equipment and record serial numbers and calibration dates.</li>
                <li>Always clean, inspect, then connect. Dirt is the number one source of avoidable loss.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Learning outcomes */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">Learning outcomes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3"><Gauge className="h-5 w-5 text-yellow-400 mt-0.5" /><span>Prepare and run OLTS tests with correct reference methods (1, 2 or 3-jumper).</span></div>
              <div className="flex items-start gap-3"><Activity className="h-5 w-5 text-yellow-400 mt-0.5" /><span>Set up OTDR with launch/tail fibres and suitable pulse width and averaging.</span></div>
              <div className="flex items-start gap-3"><Shield className="h-5 w-5 text-yellow-400 mt-0.5" /><span>Apply pass/fail thresholds from the design loss budget.</span></div>
              <div className="flex items-start gap-3"><FileText className="h-5 w-5 text-yellow-400 mt-0.5" /><span>Capture clean documentation for handover and future maintenance.</span></div>
            </CardContent>
          </Card>

          {/* OLTS procedure */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">OLTS (Power Meter + Light Source)</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <ol className="list-decimal pl-5 space-y-1">
                <li>Check calibration label and battery level; warm up light source per manufacturer guidance.</li>
                <li>Clean and inspect all connectors and reference leads with a scope; replace damaged tips.</li>
                <li>Select wavelengths and test sequence. Set reference using the agreed method (1/2/3-jumper).</li>
                <li>Test each core both directions for bi-directional average. Record results per core and wavelength.</li>
                <li>Compare to design limits (connectors, splices, fibre length attenuation). Mark pass/fail.</li>
              </ol>
              <p className="text-gray-400 text-sm">Tip: Photograph the reference setup to evidence the chosen method during audit.</p>
            </CardContent>
          </Card>

          {/* OTDR setup and interpretation */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">OTDR Setup and Trace Interpretation</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <ul className="list-disc pl-5 space-y-1">
                <li>Use launch and tail fibres to move the event dead-zone away from the first/last connector.</li>
                <li>Set range slightly beyond the known link length; start with auto, then refine manually.</li>
                <li>Choose pulse width: short for near events resolution, longer for long links signal-to-noise.</li>
                <li>Average adequately for a stable trace; avoid excessive averaging that hides intermittent issues.</li>
                <li>Identify reflective events (connectors, breaks) vs non-reflective (fusion splices, bends).</li>
              </ul>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-card/60 rounded-md p-3">
                  <h3 className="text-white font-semibold mb-1">Typical thresholds</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Connector: ~0.2–0.5 dB (good); &gt;0.75 dB investigate/clean/replace.</li>
                    <li>Fusion splice: ~0.05–0.1 dB (good); &gt;0.2 dB rework.</li>
                    <li>Fibre attenuation: SM 0.35 dB/km @1310 nm, 0.22 dB/km @1550 nm (typical).</li>
                  </ul>
                </div>
                <div className="bg-card/60 rounded-md p-3">
                  <h3 className="text-white font-semibold mb-1">Common fault signatures</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Step increases at a bend or crush point (non-reflective loss).</li>
                    <li>High reflectance spike followed by large loss indicates connector damage or break.</li>
                    <li>Gradual slope change can indicate fibre mismatch or wrong launch conditions.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentation & pass/fail */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">Pass/Fail, Records and Handover</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                Create a link loss budget before testing, then set instrument thresholds accordingly. File OLTS tables and OTDR
                .sor traces with: project, link IDs, core numbers, wavelengths, direction, date/time, tester name, equipment
                model/serial/calibration, and environment notes. Label routes, panels and cassettes consistently.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-card/60 rounded-md p-3">
                  <h3 className="text-white font-semibold mb-1">Quick checklist</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Design budget agreed and documented.</li>
                    <li>Cleanliness regime in place (inspect every mate).</li>
                    <li>Launch/tail fibres labelled and verified good.</li>
                    <li>Bi-directional results captured and averaged.</li>
                    <li>All records exported and backed up.</li>
                  </ul>
                </div>
                <div className="bg-card/60 rounded-md p-3">
                  <h3 className="text-white font-semibold mb-1">Safety and compliance</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Observe eye safety: never look into live fibre; use power meter first.</li>
                    <li>Segregate from LV per BS 7671 and maintain separation in shared containment.</li>
                    <li>Follow BS EN 50174 routing, fixings and bend radius requirements.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Worked example */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">Worked example: loss budget</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <p className="text-sm text-gray-400">SM link, 1.2 km @1310 nm, 2 connectors, 1 splice:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fibre loss: 1.2 km × 0.35 dB/km = 0.42 dB</li>
                <li>Connectors: 2 × 0.5 dB (design worst case) = 1.0 dB</li>
                <li>Splices: 1 × 0.1 dB = 0.1 dB</li>
                <li>Total design loss = 1.52 dB. Pass limit set to 1.6 dB (incl. small margin).</li>
              </ul>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Check</CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz questions={sequentialQuestions} title="Fibre Testing & Certification Quiz" />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Link to="../data-cabling-module-3-section-4">
              <Button variant="secondary">Back</Button>
            </Link>
            <Link to="../data-cabling-module-3-section-6">
              <Button>Next</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataCablingModule3Section5;
