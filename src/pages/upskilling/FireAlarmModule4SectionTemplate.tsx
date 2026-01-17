import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

// Placeholder for the shared quiz component exists in project

const FireAlarmModule4SectionTemplate = ({
  icon: Icon,
  sectionNumber,
  title,
  description,
  badges = [],
  intro,
  learnings,
  blocks,
  quiz,
  prev,
  next,
}: {
  icon: any;
  sectionNumber: string;
  title: string;
  description: string;
  badges?: string[];
  intro: string;
  learnings: string[];
  blocks: { heading: string; points: string[] }[];
  quiz: QuizQuestion[];
  prev?: string;
  next?: string;
}) => {
  // SEO per section
  useEffect(() => {
    document.title = `${title} | Fire Alarm Module 4 ${sectionNumber}`;
    const desc = description;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    if (meta) meta.content = desc;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    if (canonical) canonical.href = window.location.href;

    const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: title, description: desc, about: [title, 'BS 5839-1'], author: { '@type': 'Organization', name: 'Training Module' } };
    const script = document.createElement('script'); script.type = 'application/ld+json'; script.text = JSON.stringify(ld); document.head.appendChild(script);
    return () => { if (script && script.parentNode) script.parentNode.removeChild(script); };
  }, [title, description, sectionNumber]);

  const sequentialQuestions = useMemo(() => quiz.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })), [quiz]);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/fire-alarm-module-4">
          <Button variant="ghost" className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>

        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Icon className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <p className="text-lg text-gray-400">{description}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">Section {sectionNumber}</Badge>
              {badges.map((b) => (
                <Badge key={b} variant="outline" className="border-gray-600 text-gray-300">{b}</Badge>
              ))}
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300">
              <p>{intro}</p>
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
                  {learnings.map((l) => (<li key={l}>{l}</li>))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Content Blocks */}
          {blocks.map((block) => (
            <Card key={block.heading} className="bg-card border-transparent">
              <CardHeader>
                <CardTitle className="text-white">{block.heading}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                  <ul className="list-disc pl-6 space-y-1">
                    {block.points.map((p) => (<li key={p}>{p}</li>))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="green" variant="subtle">
                <p>Key points have been covered to support safe, compliant design and commissioning in the UK context.</p>
              </AccentPanel>
            </CardContent>
          </Card>

          <SingleQuestionQuiz questions={sequentialQuestions} title="Knowledge Check" />

          {/* Nav */}
          <div className="flex justify-between mt-8">
            {prev ? (
              <Link to={prev}>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Section
                </Button>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={next}>
                <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                  Next Section
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link to="/study-centre/upskilling/fire-alarm-module-4">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                  Module Overview
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule4SectionTemplate;
