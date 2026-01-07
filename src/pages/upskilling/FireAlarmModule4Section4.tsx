import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Route as RouteIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule4Section4 = () => {
  // SEO
  useEffect(() => {
    const title = 'Cable Routing, Segregation & Fixings | FA Module 4 Sec 4';
    document.title = title;
    const desc = 'Routing rules, segregation, mechanical protection and fixings to prevent premature collapse. BS 5839-1 and BS 7671 considerations.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    if (meta) meta.content = desc;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    if (canonical) canonical.href = window.location.href;
    const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Cable Routing, Segregation & Fixings', description: desc, about: ['Cable routing', 'Segregation', 'Fixings', 'BS 7671 521.10.202'], author: { '@type': 'Organization', name: 'Training Module' } };
    const script = document.createElement('script'); script.type = 'application/ld+json'; script.text = JSON.stringify(ld); document.head.appendChild(script);
    return () => { if (script && script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  const questions: QuizQuestion[] = useMemo(() => [
    { id: 1, question: 'Segregation reduces:', options: ['Cable cost', 'EMC interference and fault risk', 'Colour choice', 'Fire rating requirements'], correctAnswer: 1, explanation: 'Segregation from LV power and other services helps avoid interference and faults.' },
    { id: 2, question: 'Fixings must:', options: ['Be plastic where hidden', 'Resist premature collapse in fire conditions', 'Be optional', 'Use cable ties only'], correctAnswer: 1, explanation: 'Use metal fixings/supports to prevent collapse (BS 7671 Reg 521.10.202).' },
    { id: 3, question: 'Penetrations should be:', options: ['Left open', 'Sealed with appropriate fire‑stopping systems', 'Covered with tape', 'Ignored'], correctAnswer: 1, explanation: 'Maintain fire compartmentation; use approved sealing systems.' },
    { id: 4, question: 'Route planning should consider:', options: ['Shortest path only', 'Access for maintenance and protection against damage', 'Random paths', 'Aesthetics only'], correctAnswer: 1, explanation: 'Plan routes to minimise damage risk and enable access.' },
    { id: 5, question: 'Cable grouping can:', options: ['Be ignored', 'Affect derating and physical space', 'Only change colour', 'Improve current capacity'], correctAnswer: 1, explanation: 'Grouping influences heat dissipation and support selection.' },
    { id: 6, question: 'Segregation distances should be:', options: ['Guessed on site', 'Followed per manufacturer/standard guidance', 'Zero', 'As small as possible'], correctAnswer: 1, explanation: 'Use recommended separation for EMC and safety.' },
    { id: 7, question: 'Mechanical protection is needed where:', options: ['Cables may be subject to impact or heat', 'It looks nice', 'Always underground only', 'Never for fire alarm'], correctAnswer: 0, explanation: 'Protect cables from foreseeable damage.' },
    { id: 8, question: 'Containment choice should consider:', options: ['Only colour', 'Environment, fire performance and EMC', 'Cheapest cost', 'What is in stock'], correctAnswer: 1, explanation: 'Select appropriate materials and construction.' },
    { id: 9, question: 'Support spacing for cables should:', options: ['Be random', 'Follow manufacturer/standard recommendations', 'Be 3 m regardless', 'Not matter'], correctAnswer: 1, explanation: 'Maintain supports at suitable intervals for weight and fire performance.' },
    { id: 10, question: 'Where crossing LV power, you should:', options: ['Tape together', 'Cross at right angles and maintain separation', 'Twist around each other', 'Share the same conduit without separation'], correctAnswer: 1, explanation: 'Reduce coupling and maintain segregation.' },
    { id: 11, question: 'The minimum segregation distance between fire alarm cables and 230V power cables in the same containment should be:', options: ['No separation needed', 'As per manufacturer guidance, typically 300mm or use physical barrier', 'Exactly 50mm always', '1 metre minimum'], correctAnswer: 1, explanation: 'Follow manufacturer recommendations; typically 300mm separation or use screening/barriers to prevent EMC issues and reduce fault risk.' },
    { id: 12, question: 'Fire-resisting cable support spacing should typically not exceed:', options: ['No limit', 'Manufacturer recommendations, commonly 300-400mm for horizontal runs', '1 metre', '2 metres'], correctAnswer: 1, explanation: 'Close support spacing maintains cable position and prevents premature collapse in fire; follow manufacturer data sheets.' },
    { id: 13, question: 'Cables passing through fire compartment walls must:', options: ['Be left with gaps around them', 'Be firestopped with tested systems maintaining compartmentation', 'Use expanding foam only', 'Be bundled tightly'], correctAnswer: 1, explanation: 'Use proprietary firestopping systems tested to maintain the fire resistance rating of the compartment boundary.' },
    { id: 14, question: 'When installing cables in ceiling voids, consider:', options: ['Hiding them behind insulation', 'Accessibility for testing/maintenance and protection from building trades', 'Installing without support', 'Using domestic cable'], correctAnswer: 1, explanation: 'Plan routes for access, protect from damage by other trades, and maintain proper support and separation.' },
    { id: 15, question: 'Vertical cable runs should be supported to prevent:', options: ['The cable looking untidy', 'Mechanical stress and cable sheath damage under its own weight', 'People seeing them', 'Improved performance'], correctAnswer: 1, explanation: 'Adequate vertical support prevents cable weight causing sheath damage, core breakage or joint failure over time.' }
  ], []);

  const sequentialQuestions = useMemo(() => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })), [questions]);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../fire-alarm-module-4">
          <Button variant="ghost" className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>

        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <RouteIcon className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Cable Routing Rules, Segregation, and Fixings</h1>
                <p className="text-lg text-gray-400">Safe routing, fire‑resistant supports and sealing</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 4.4</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Installation</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300">
              <p>Plan routes to maintain system integrity, reduce interference and protect compartmentation. Use supports that resist premature collapse and provide mechanical protection where needed.</p>
            </CardContent>
          </Card>

          {/* Guidance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Guidance & Best Practice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Segregation</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Segregate from LV power and other services; follow manufacturer separation distances.</li>
                    <li>Use screened cable or metallic containment where EMC is a concern.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Supports & Fixings</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use metallic fixings/supports at appropriate intervals; avoid plastic only fixings.</li>
                    <li>Comply with BS 7671 Reg 521.10.202 regarding premature collapse.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Penetrations & Protection</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Seal penetrations with appropriate fire‑stopping systems.</li>
                    <li>Provide mechanical protection against impact or environmental damage.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deep Dive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Deep Dive: Segregation, Supports & Penetrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Map high‑risk areas; avoid hot zones and sources of mechanical damage.</li>
                  <li>Use metallic fixings/clips that maintain integrity in fire (no plastic only).</li>
                  <li>Seal penetrations with approved systems and label for maintenance.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Commissioning & Fault‑finding */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Commissioning & Fault‑finding</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Inspect support spacing and fixings; rectify plastic‑only supports.</li>
                  <li>Verify separation distances from LV circuits; check crossings are at right angles.</li>
                  <li>Document and photograph fire‑stopping works for O&M manuals.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">FAQs</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Can I use plastic clips under metal trunking lids? — Not as sole support; use non‑combustible supports.</li>
                  <li>How far from LV? — Follow manufacturer/standard guidance; consider EMC.</li>
                  <li>Do I need to seal small gaps? — Yes, maintain compartmentation with suitable products.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Glossary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Glossary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Segregation: Physical separation from other services for EMC/safety.</li>
                  <li>Premature collapse: Failure of fixings in fire causing entanglement hazard.</li>
                  <li>Fire‑stopping: Sealing to restore fire resistance of elements penetrated by services.</li>
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
                <p>Thoughtful routing, adequate segregation and robust fixings protect life‑safety circuits and maintain compartmentation.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz questions={sequentialQuestions} title="Knowledge Check: Routing & Fixings" />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-4-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-4-section-5">
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

export default FireAlarmModule4Section4;
