import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule4Section1 = () => {
  // SEO
  useEffect(() => {
    const title = 'Power Supply Requirements & Ratings | FA Module 4 Sec 1';
    document.title = title;
    const desc = 'Mains supply quality, PSU ratings, load calculations, monitoring and UK compliance for BS 5839-1 fire alarm systems.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;

    // Canonical tag
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    if (canonical) canonical.href = window.location.href;

    // Structured data (Article)
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Power Supply Requirements & Ratings',
      description: desc,
      about: ['BS 5839-1', 'Power supply', 'Load calculation', 'Monitoring'],
      author: { '@type': 'Organization', name: 'Training Module' }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);

    return () => {
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  // Quiz
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Power supplies should be monitored for:',
      options: ['Voltage only', 'Presence, fault and battery condition', 'Frequency only', 'Nothing is monitored'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 expects monitoring of supply presence and faults; battery condition is also monitored by the CIE.'
    },
    {
      id: 2,
      question: 'Load calculations must consider:',
      options: ['Standby only', 'Alarm only', 'Both standby and alarm currents including safety factors', 'Charger current only'],
      correctAnswer: 2,
      explanation: 'You must calculate both standby and full alarm current and include appropriate margins.'
    },
    {
      id: 3,
      question: 'Mains supply for CIE should generally be taken from:',
      options: ['A socket ring final', 'A local lighting circuit', 'A dedicated, labelled circuit from the distribution board', 'Any convenient spur'],
      correctAnswer: 2,
      explanation: 'A dedicated, labelled circuit is typical good practice to avoid inadvertent isolation.'
    },
    {
      id: 4,
      question: 'Voltage drop on alarm circuits should be:',
      options: ['Ignored', 'Within manufacturer limits to ensure device operation', 'Above 10V', 'Exactly 0V'],
      correctAnswer: 1,
      explanation: 'Keep within device and panel instructions so sounders/VADs and interfaces operate correctly.'
    },
    {
      id: 5,
      question: 'Which UK wiring regulation addresses prevention of premature collapse of cables?',
      options: ['BS 7671 411.3.3', 'BS 7671 521.10.202', 'BS 7671 433.1', 'BS 7671 560.7.1'],
      correctAnswer: 1,
      explanation: 'BS 7671 Reg 521.10.202 requires suitable metallic fixings/supports so wiring systems do not collapse in fire.'
    },
    {
      id: 6,
      question: 'Preferred isolation for the fire alarm mains supply is:',
      options: ['Unlabelled MCB anywhere', 'A clearly labelled, lockable device at the origin or local DB', 'A plug and socket', 'A spur with neon'],
      correctAnswer: 1,
      explanation: 'Provide a labelled isolator; avoid accidental disconnection and follow manufacturer guidance.'
    },
    {
      id: 7,
      question: 'Sounder/VAD circuit current should be verified against:',
      options: ['Marketing brochures', 'Worst-case device current at specified supply and ambient', 'Average current only', 'Charger rating only'],
      correctAnswer: 1,
      explanation: 'Use worst‑case device data and include margins to ensure alarm operation.'
    },
    {
      id: 8,
      question: 'PSU rating selection should:',
      options: ['Exactly match calculated alarm current with no margin', 'Exceed calculated loads with allowance for diversity and growth', 'Ignore standby consumption', 'Be based on cable size only'],
      correctAnswer: 1,
      explanation: 'Allow headroom for real‑world variation, manufacturer advice and future expansion.'
    },
    {
      id: 9,
      question: 'Supply circuit identification should include:',
      options: ['No special label', 'A durable label stating Fire Alarm – Do Not Switch Off', 'Pencil marks', 'Temporary tape'],
      correctAnswer: 1,
      explanation: 'Clear, durable labelling helps prevent inadvertent isolation.'
    },
    {
      id: 10,
      question: 'Where should mains earth bonding/earthing be considered in relation to CIE and peripherals?',
      options: ['Not required', 'Per BS 7671 and manufacturer instructions to manage EMC and safety', 'Always bond to data screens only', 'Bond neutral and earth together'],
      correctAnswer: 1,
      explanation: 'Follow BS 7671 earthing/bonding and manufacturer EMC practices; never link N‑E.'
    },
    {
      id: 11,
      question: 'What is the typical standby autonomy period required for a Category L system in a building with phased evacuation?',
      options: ['12 hours', '24 hours', '48 hours', '72 hours'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 typically requires 24 hours standby plus 30 minutes alarm for most Category L systems, though the fire strategy may specify different requirements.'
    },
    {
      id: 12,
      question: 'When calculating load for multiple sounders, you should use:',
      options: ['Average operating current', 'Peak inrush current for all devices simultaneously', 'Minimum rated current', 'Current at 12V only'],
      correctAnswer: 1,
      explanation: 'Calculate using worst-case peak inrush current at minimum supply voltage to ensure adequate PSU capacity during alarm activation.'
    },
    {
      id: 13,
      question: 'RCD protection on fire alarm mains supply should be:',
      options: ['Always fitted', 'Avoided or coordinated per BS 5839-1 to prevent nuisance disconnection', 'Set to 10mA', 'Required by BS 7671 in all cases'],
      correctAnswer: 1,
      explanation: 'BS 5839-1 advises avoiding RCD protection where possible, or using time-delayed types to prevent unwanted tripping affecting life safety systems.'
    },
    {
      id: 14,
      question: 'The fire alarm supply isolation device should be located:',
      options: ['In a public area for easy access', 'In a secure location accessible only to authorised persons', 'Hidden with no identification', 'Outside the building'],
      correctAnswer: 1,
      explanation: 'Secure location prevents unauthorised isolation while ensuring authorised maintenance personnel can safely isolate when required.'
    },
    {
      id: 15,
      question: 'When verifying PSU capacity during commissioning, you should measure:',
      options: ['Mains voltage only', 'Standby current and full alarm current with all devices operating', 'Battery voltage only', 'Cable resistance only'],
      correctAnswer: 1,
      explanation: 'Practical verification involves measuring actual currents in both standby and full alarm conditions to confirm calculations and PSU adequacy.'
    }
  ], []);

  const sequentialQuestions = useMemo(
    () => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })),
    [questions]
  );

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../fire-alarm-module-4">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>

        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Power Supply Requirements and Ratings</h1>
                <p className="text-lg text-gray-400">Mains, PSU sizing, monitoring and compliance</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section 4.1</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">CIE Power</Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300">
              <p>Fire alarm control and indicating equipment (CIE) requires a reliable mains supply and correctly rated PSU. We verify load calculations for standby and alarm, monitor the supply and ensure UK compliance with BS 5839-1 and BS 7671.</p>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Identify suitable mains supplies and isolation/label requirements.</li>
                  <li>Calculate PSU loading for standby and alarm conditions.</li>
                  <li>Control voltage drop and ensure device performance.</li>
                  <li>Apply monitoring and fault indication requirements.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Supply & Ratings */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Supply & Ratings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Mains Supply</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Dedicated, labelled circuit from distribution board with local means of isolation.</li>
                    <li>Supply presence and fault monitoring indicated at the CIE.</li>
                    <li>Protective device type/ratings to manufacturer recommendations.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Load Calculation</h3>
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Standby current: all quiescent loads (detectors, loops, interfaces, panel).</li>
                    <li>Alarm current: sounders/VADs, relays and panel at full alarm.</li>
                    <li>Add appropriate design margin; verify charger capability.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Worked Example */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Worked Example</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <p>Panel quiescent 120 mA, loop devices 280 mA, interfaces 50 mA → Standby ≈ 450 mA. Alarm: sounders/VADs 1.6 A, relays 150 mA, panel 200 mA → Alarm ≈ 1.95 A. Specify PSU ≥ 2 A continuous with surge capacity per manufacturer.</p>
              </div>
            </CardContent>
          </Card>

          {/* BS Highlights */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Standards Highlights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="amber" variant="subtle">
                <ul className="list-disc pl-6 space-y-1">
                  <li>BS 5839-1: CIE power monitoring, indication and battery backup requirements.</li>
                  <li>BS 7671 Reg 521.10.202: non-combustible fixings/supports to prevent premature collapse.</li>
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
                  <li>Undersized PSU leading to brownouts during alarm.</li>
                  <li>Supply taken from shared circuits that can be inadvertently switched off.</li>
                  <li>Ignoring voltage drop on long sounder/VAD circuits.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Deep Dive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Deep Dive: Mains Quality, Volt Drop & PSU Margins</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Mains quality: verify voltage range and harmonics do not exceed manufacturer limits.</li>
                  <li>Volt drop: calculate for worst‑case alarm current and longest run; check device min volts.</li>
                  <li>PSU margins: allow start‑up surges and future expansion; document assumptions.</li>
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
                  <li>Prove supply failure/fault monitoring and battery changeover/charger operation.</li>
                  <li>Confirm labels on the supply isolator: “Fire Alarm – Do Not Switch Off”.</li>
                  <li>Investigate brownouts: measure alarm current, check PSU headroom and cable drop.</li>
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
                  <li>Can I use a shared socket circuit? — Avoid; use a dedicated, labelled supply.</li>
                  <li>How much margin? — Follow panel maker guidance; commonly 20–50% depending on loads.</li>
                  <li>Does BS 7671 apply? — Yes, supply cabling/earthing/identification and fixings must comply.</li>
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
                  <li>Autonomy: Time the system can operate on batteries (standby + alarm).</li>
                  <li>Volt drop: Reduction in circuit voltage under load due to resistance.</li>
                  <li>CIE: Control and Indicating Equipment (the fire alarm panel).</li>
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
                <p>Correctly rated and monitored supplies ensure reliable operation during both standby and alarm, in line with BS 5839‑1 and BS 7671.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz
            questions={sequentialQuestions}
            title="Knowledge Check: Power Supply Requirements"
          />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Link to="../fire-alarm-module-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Module Overview
              </Button>
            </Link>
            <Link to="../fire-alarm-module-4-section-2">
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

export default FireAlarmModule4Section1;
