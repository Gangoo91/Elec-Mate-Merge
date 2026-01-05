import { useEffect, useMemo } from 'react';
import { ArrowLeft, Cpu, Scissors, Link2, Settings, Wrench, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import type { QuizQuestion } from '@/types/quiz';

const DataCablingModule3Section3 = () => {
  // SEO
  useEffect(() => {
    const title = 'Cleaving, Splicing & Connectorisation | Module 3 Sec 3';
    document.title = title;
    const desc = 'Hands-on guide to fibre cleaving, fusion/mechanical splicing, and connectorisation with pro tips, tools, and quality targets.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      (meta as HTMLMetaElement).name = 'description';
      document.head.appendChild(meta);
    }
    (meta as HTMLMetaElement).content = desc;

    // Canonical
    const href = window.location.origin + '/data-cabling-module-3-section-3';
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
      question: 'What is the typical insertion loss for a good fusion splice?',
      options: ['~0.8 dB', '~0.5 dB', '~0.1 dB', '~0.05 dB'],
      correctAnswer: 3,
      explanation: 'A well-executed fusion splice typically achieves ~0.05 dB loss.'
    },
    {
      id: 2,
      question: 'Which statement about mechanical splices is TRUE?',
      options: ['They are permanent and cannot be re-opened', 'They usually have higher loss than fusion splices', 'They require arc welding equipment', 'They are unsuitable for multimode fibre'],
      correctAnswer: 1,
      explanation: 'Mechanical splices typically have 0.2–0.5 dB loss and are used when fusion is impractical.'
    },
    {
      id: 3,
      question: 'Why is cleave angle critical before splicing?',
      options: ['It changes fibre colour', 'It affects back reflection and splice loss', 'It prevents connector damage', 'It changes the index of refraction'],
      correctAnswer: 1,
      explanation: 'Poor cleave angles increase splice loss and reflections; <0.5° is the target for fusion splicing.'
    },
    {
      id: 4,
      question: 'Which item is essential for safe fibre handling?',
      options: ['PVC gloves', 'Magnet tray', 'Fibre disposal container', 'Soldering mat'],
      correctAnswer: 2,
      explanation: 'Fibre shards are dangerous; use a designated disposal container to comply with safe working practices.'
    },
    {
      id: 5,
      question: 'Which connector method offers the lowest loss?',
      options: ['No-epoxy/no-polish mechanical', 'Epoxy and polish field terminations', 'Pre-terminated pigtail fusion splice', 'Cold-cure crimp style'],
      correctAnswer: 2,
      explanation: 'Factory-polished pigtails fusion spliced to the cable typically deliver the best loss performance.'
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
            <Cpu className="h-6 w-6 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-semibold">
              Section 3
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Cleaving, Splicing and Connectorisation
          </h1>
          <p className="text-base text-gray-400 max-w-3xl">
            Step-by-step methods, tools, and quality targets for reliable fibre joins
          </p>
        </div>

        <div className="space-y-8 mt-8">
          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                What makes a good fibre joint?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Reliable fibre joins depend on precise preparation, clean end-faces, correct alignment, and appropriate joining method. 
                This section provides practical, site-ready procedures and acceptance criteria aligned with manufacturer guidance and BS7671 routing/segregation principles.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-2">Quality Targets (Typical):</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Fusion splice loss: <span className="text-white">≤0.1 dB (typical 0.05 dB)</span></li>
                  <li>• Mechanical splice loss: <span className="text-white">0.2–0.5 dB</span></li>
                  <li>• Connector insertion loss: <span className="text-white">≤0.3 dB (Grade A)</span></li>
                  <li>• Return loss: <span className="text-white">≥50 dB (UPC), ≥60 dB (APC)</span></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-3">After this section, you will be able to:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Prepare fibre correctly and achieve near‑perfect cleaves</li>
                  <li>• Perform fusion and mechanical splicing with confidence</li>
                  <li>• Choose connectorisation methods for best performance</li>
                  <li>• Inspect and verify joint quality against targets</li>
                  <li>• Apply safe working practices and shard disposal</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cleaving Essentials */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Scissors className="h-5 w-5 text-yellow-400" />
                Cleaving Essentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                The cleave is the foundation of a good splice or connector. Aim for a clean, perpendicular end-face with a cleave angle &lt;0.5° for fusion splicing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">Procedure</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-300">
                    <li>Strip primary coating to specified length</li>
                    <li>Clean fibre with lint-free wipe and IPA</li>
                    <li>Place fibre in cleaver with correct length stop</li>
                    <li>Close lid and actuate blade in one smooth motion</li>
                    <li>Inspect offcut and end-face; re-cleave if chipped</li>
                  </ol>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">Practical Tips</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Replace cleaver blade positions as scheduled</li>
                    <li>• Keep work area dust‑free; cap tools when idle</li>
                    <li>• Maintain consistent strip lengths for repeatability</li>
                    <li>• Dispose of shards in a dedicated container</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Splicing Methods */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Link2 className="h-5 w-5 text-yellow-400" />
                Splicing: Fusion vs Mechanical
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Choose the splicing method based on performance targets, environment, and available equipment.</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Fusion Splice</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Lowest loss and reflection</li>
                    <li>• Requires fusion splicer and power</li>
                    <li>• Ideal for pigtail connectorisation</li>
                    <li>• Typical loss: 0.05–0.1 dB</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Mechanical Splice</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Quick, no arc equipment required</li>
                    <li>• Higher loss than fusion (0.2–0.5 dB)</li>
                    <li>• Useful for emergency repairs</li>
                    <li>• Requires careful alignment and gel</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-600/20 border border-yellow-400/30 p-4 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  <strong>Pro tip:</strong> For best results, factory‑polished LC/SC pigtails fusion spliced to the cable offer superior and repeatable connector performance.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Connectorisation Methods */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Connectorisation Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Three common approaches to achieving connectorised ends:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">1) Fusion Pigtail</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Best optical performance</li>
                    <li>• Requires splice trays and protection</li>
                    <li>• Preferred for singlemode OS2</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">2) Epoxy & Polish (Field)</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Good performance with skill</li>
                    <li>• Requires curing and polishing</li>
                    <li>• More labour intensive</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">3) No‑Epoxy/No‑Polish</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Fast, tool‑light solution</li>
                    <li>• Higher loss; verify with testing</li>
                    <li>• Useful for temporary links</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety & Tools */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Tools, Safety and Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">Essential Toolkit</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Fibre stripper, cleaver, isopropyl alcohol</li>
                    <li>• Fusion splicer or mechanical splice kit</li>
                    <li>• Heat‑shrink protectors and splice trays</li>
                    <li>• Visual fault locator and power meter</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">Safe Working (UK)</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Use PPE and dedicated shard containers</li>
                    <li>• Maintain segregation from LV power (BS7671)</li>
                    <li>• Keep bend radius and strain limits per datasheet</li>
                    <li>• Never look into live fibres; use detectors</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Splice Case Management & Environment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Splice Case Management & Environment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">Tray Dressing Steps</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-300">
                    <li>Plan fibre order to match panel mapping</li>
                    <li>Route loose tubes with radius limiters</li>
                    <li>Splice pigtails; heat‑shrink protection sleeves</li>
                    <li>Lash fibres neatly; avoid crossing where possible</li>
                    <li>Label trays, cassettes and ports consistently</li>
                  </ol>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">Environmental Control</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Keep lids on cases; avoid draughts and dust</li>
                    <li>• Use heaters only as permitted by permits/COSHH</li>
                    <li>• Humidity can affect gels—store per datasheet</li>
                    <li>• Maintain segregation from LV per BS 7671</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-400/10 border border-yellow-400/30 p-4 rounded-lg">
                <p className="text-foreground text-sm"><strong className="text-yellow-400">Tip:</strong> Photograph tray layouts before closing cases to speed future maintenance and audits.</p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Check</CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz questions={sequentialQuestions} title="Splicing & Connectorisation Quiz" />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../data-cabling-module-3-section-2">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <Link to="../data-cabling-module-3-section-4">
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

export default DataCablingModule3Section3;