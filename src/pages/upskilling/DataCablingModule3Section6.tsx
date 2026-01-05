import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bug, Wrench, Shield, FileText, AlertTriangle } from 'lucide-react';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import type { QuizQuestion } from '@/types/quiz';

const DataCablingModule3Section6 = () => {
  // SEO: title, description, canonical, structured data
  useEffect(() => {
    const title = 'Module 3 · Section 6 | Fibre Fault Finding, Handover & Maintenance';
    const description =
      'Systematic fibre troubleshooting, interpreting OTDR faults, BS-aligned handover packs, labelling, and preventative maintenance tips.';

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
    canonical.href = window.location.origin + '/data-cabling-module-3-section-6';

    // JSON-LD Article
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Fibre Fault Finding, Handover & Maintenance',
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
      question: 'Which tool quickly locates near-end breaks or mispatches?',
      options: ['OTDR', 'VFL (visual fault locator)', 'OLTS only', 'Fusion splicer'],
      correctAnswer: 1,
      explanation: 'A VFL injects visible light to show breaks/mismatches close to the end-face.'
    },
    {
      id: 2,
      question: 'A non-reflective step loss on OTDR most likely indicates:',
      options: ['Connector reflection', 'Fibre break', 'Fusion splice or bend', 'Power failure'],
      correctAnswer: 2,
      explanation: 'Splices and bends present as non-reflective losses.'
    },
    {
      id: 3,
      question: 'A robust handover pack should include:',
      options: ['Only as-built drawings', 'OLTS and OTDR results with equipment calibration info', 'A single screenshot', 'Just panel photos'],
      correctAnswer: 1,
      explanation: 'Include full test data, equipment serials/calibration, and labelling to support maintenance.'
    },
    {
      id: 4,
      question: 'Why keep baseline traces?',
      options: ['To reduce loss', 'To compare future tests and identify changes', 'For marketing', 'They are not useful'],
      correctAnswer: 1,
      explanation: 'Baselines make deviations obvious and speed up troubleshooting.'
    },
    {
      id: 5,
      question: 'Which is a safe practice?',
      options: ['Looking into connectors to check light', 'Skipping cleaning to save time', 'Using shard containers and PPE', 'Removing bend limiters'],
      correctAnswer: 2,
      explanation: 'Use PPE and proper disposal; never look into live fibre.'
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
            <Bug className="h-7 w-7 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 font-semibold text-xs px-2 py-0.5 border-0">
              Module 3 · Section 6
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Fibre Fault Finding, Handover & Maintenance</h1>
          <p className="text-base text-gray-400 max-w-3xl">
            Practical troubleshooting flows, interpreting OTDR signatures, and producing a maintenance-ready handover pack.
          </p>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Colour splash callout */}
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-md p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <p className="text-foreground text-sm">Troubleshoot methodically: clean, verify continuity, OLTS, then OTDR to pinpoint events.</p>
          </div>
          {/* Troubleshooting flow */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">Troubleshooting flow (field proven)</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <ol className="list-decimal pl-5 space-y-1">
                <li>Visual: Check labels, patching, tray routing, bend radius, and visible damage.</li>
                <li>Clean & inspect: Both end-faces. Re-test after cleaning before changing anything else.</li>
                <li>Continuity/sanity: Use VFL for near-end breaks or mispatch; confirm light path.</li>
                <li>OLTS: Measure end-to-end at relevant wavelengths, bi-directional where possible.</li>
                <li>OTDR: Characterise and locate events; use launch/tail; compare to baseline traces.</li>
                <li>Isolate segment: Swap jumpers, move ports, or test mid-span to narrow down the fault.</li>
              </ol>
              <p className="text-gray-400 text-sm">Tip: Change a single variable at a time to avoid masking the root cause.</p>
            </CardContent>
          </Card>

          {/* Common OTDR fault signatures */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">Common OTDR signatures</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 grid sm:grid-cols-2 gap-3">
              <div className="bg-card/60 rounded-md p-3">
                <h3 className="text-white font-semibold mb-1">High reflectance spike</h3>
                <p className="text-sm">Damaged connector or air gap. Remake connector or re-terminate pigtail.</p>
              </div>
              <div className="bg-card/60 rounded-md p-3">
                <h3 className="text-white font-semibold mb-1">Non-reflective step loss</h3>
                <p className="text-sm">Micro/macro bend or poor splice. Re-route with correct radius or re-splice.</p>
              </div>
              <div className="bg-card/60 rounded-md p-3">
                <h3 className="text-white font-semibold mb-1">Slope change</h3>
                <p className="text-sm">Fibre type mismatch or wrong launch conditions; verify components.</p>
              </div>
              <div className="bg-card/60 rounded-md p-3">
                <h3 className="text-white font-semibold mb-1">End reflection with large loss</h3>
                <p className="text-sm">Open connector or break near end. Inspect connector and tail lead.</p>
              </div>
            </CardContent>
          </Card>

          {/* Handover pack */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">Handover documentation pack</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <ul className="list-disc pl-5 space-y-1">
                <li>As-built drawings and fibre schedules with unique IDs and routes.</li>
                <li>OLTS tables and OTDR traces (.sor) per core and wavelength, bi-directional averages noted.</li>
                <li>Equipment details: model, serial number, calibration dates, and firmware versions.</li>
                <li>Cleaning and inspection records; photos of key terminations and splice trays.</li>
                <li>Labelling scheme, panel maps, and cross-reference to room/asset numbers.</li>
              </ul>
              <p className="text-gray-400 text-sm">Align routing, separation and bonding practices with BS 7671 and BS EN 50174.</p>
            </CardContent>
          </Card>

          {/* Preventative maintenance */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">Preventative maintenance</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3"><Wrench className="h-5 w-5 text-yellow-400 mt-0.5" /><span>Adopt a clean-before-connect policy; keep caps on; use proper lint-free wipes and IPA.</span></div>
              <div className="flex items-start gap-3"><Shield className="h-5 w-5 text-yellow-400 mt-0.5" /><span>Check bend radius and strain relief at panels annually; re-tidy patching.</span></div>
              <div className="flex items-start gap-3"><FileText className="h-5 w-5 text-yellow-400 mt-0.5" /><span>Maintain a baseline test library to compare future faults quickly.</span></div>
              <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" /><span>Risk assess hot works for on-site splicing; follow site permits and COSHH.</span></div>
            </CardContent>
          </Card>

          {/* On-the-job scenario */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">On-the-job scenario</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2">
              <p>
                An existing SM link shows intermittent errors. OLTS passes but OTDR reveals periodic non-reflective steps every
                ~20m. Investigation finds a tight basket lid compressing the loose tube at supports. Re-routing and adding
                saddles to maintain radius resolves the issue; baseline trace updated for records.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Check</CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz questions={sequentialQuestions} title="Fault Finding & Handover Quiz" />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Link to="../data-cabling-module-3-section-5">
              <Button variant="secondary">Back</Button>
            </Link>
            <Link to="../data-cabling-module-4">
              <Button>Next</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataCablingModule3Section6;
