import { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule6SectionTemplate = ({
  icon: Icon,
  sectionNumber,
  title,
  description,
  badges = [],
  intro,
  learnings,
  blocks,
  summary,
  quiz,
  prev,
  next,
  blocksLayout = 'grid',
  duration = '15 minutes',
}: {
  icon: any;
  sectionNumber: string;
  title: string;
  description: string;
  badges?: string[];
  intro: string;
  learnings: string[];
  blocks: { heading: string; points: string[] }[];
  summary?: string[] | string;
  quiz: QuizQuestion[];
  prev?: string;
  next?: string;
  blocksLayout?: 'grid' | 'stack' | 'article';
  duration?: string;
}) => {
  // SEO per section
  useEffect(() => {
    document.title = `${title} | Fire Alarm Module 6 ${sectionNumber}`;
    const desc = description;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    if (meta) meta.content = desc;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    if (canonical) canonical.href = window.location.href;

    const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: title, description: desc, about: [title, 'BS 5839-1', 'BS 7671'], author: { '@type': 'Organization', name: 'Training Module' } };
    const script = document.createElement('script'); script.type = 'application/ld+json'; script.text = JSON.stringify(ld); document.head.appendChild(script);
    return () => { if (script && script.parentNode) script.parentNode.removeChild(script); };
  }, [title, description, sectionNumber]);

  const sequentialQuestions = useMemo(() => quiz.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })), [quiz]);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/fire-alarm-module-6">
          <Button variant="ghost" className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>

        <div className="space-y-8 max-w-7xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Icon className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">{title}</h1>
                <p className="text-xl text-gray-400">Module 6, Section {sectionNumber}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 6.{sectionNumber}
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                {duration}
              </Badge>
              {badges.map((b) => (
                <Badge key={b} variant="outline" className="border-gray-600 text-gray-300">{b}</Badge>
              ))}
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              {typeof intro === 'string' ? intro.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              )) : <p>{intro}</p>}
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2">
                {learnings.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Content Blocks */}
          {blocksLayout === 'grid' ? (
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blocks.map((block) => (
                  <Card key={block.heading} className="bg-card border-transparent h-full">
                    <CardHeader>
                      <CardTitle className="text-yellow-400">{block.heading}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-300">
                      <div className="space-y-1">
                        {block.points.map((p) => (
                          <div key={p} className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{p}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : blocksLayout === 'stack' ? (
            <section className="space-y-6">
              {blocks.map((block, blockIndex) => (
                <Card key={block.heading} className="bg-card border-transparent">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                        {blockIndex + 1}
                      </div>
                      {block.heading}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6 text-gray-300">
                      {/* Check if block contains step-by-step content */}
                      {block.heading.toLowerCase().includes('step-by-step') ? (
                        <div className="space-y-3">
                          {block.points.map((point, i) => (
                            <div key={point} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {i + 1}
                              </div>
                              <div>
                                <p className="text-gray-300">{point}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : block.heading.toLowerCase().includes('overview') || block.heading.toLowerCase().includes('schedule') ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {block.points.slice(0, 3).map((point, i) => {
                            const colors = [
                              { bg: 'bg-card', border: 'border-yellow-400/30', icon: 'text-yellow-400' },
                              { bg: 'bg-card', border: 'border-orange-500/20', icon: 'text-orange-400' },
                              { bg: 'bg-card', border: 'border-purple-500/20', icon: 'text-purple-400' }
                            ];
                            const colorSet = colors[i] || colors[0];
                            const titles = point.split(':')[0];
                            const content = point.split(':').slice(1).join(':');
                            return (
                              <div key={point} className={`${colorSet.bg} border ${colorSet.border} rounded-lg p-4`}>
                                <div className="flex items-center gap-2 mb-3">
                                  <div className={`h-5 w-5 ${colorSet.icon}`}>•</div>
                                  <h3 className="font-semibold text-white">{titles}</h3>
                                </div>
                                <p className="text-sm text-gray-300">{content}</p>
                              </div>
                            );
                          })}
                        </div>
                      ) : block.heading.toLowerCase().includes('requirements') || block.heading.toLowerCase().includes('components') ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">{block.heading.replace('Requirements', 'Details').replace('Components', 'Items')}</h3>
                            <div className="space-y-3">
                              {block.points.slice(0, Math.ceil(block.points.length / 2)).map((point, i) => {
                                const colors = ['border-yellow-400', 'border-red-500', 'border-green-500', 'border-purple-500', 'border-yellow-400', 'border-pink-500'];
                                const colorClass = colors[i % colors.length];
                                return (
                                  <div key={point} className={`bg-card p-3 rounded border-l-4 ${colorClass}`}>
                                    <p className="font-medium text-white">{point.split(':')[0]}</p>
                                    {point.includes(':') && (
                                      <p className="text-gray-400 text-sm">{point.split(':').slice(1).join(':')}</p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          {block.points.length > 3 && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-white">Additional Details</h3>
                              <div className="space-y-3">
                                {block.points.slice(Math.ceil(block.points.length / 2)).map((point, i) => {
                                  const colors = ['border-orange-500', 'border-cyan-500', 'border-lime-500', 'border-rose-500', 'border-indigo-500', 'border-amber-500'];
                                  const colorClass = colors[i % colors.length];
                                  return (
                                    <div key={point} className={`bg-card p-3 rounded border-l-4 ${colorClass}`}>
                                      <p className="font-medium text-white">{point.split(':')[0]}</p>
                                      {point.includes(':') && (
                                        <p className="text-gray-400 text-sm">{point.split(':').slice(1).join(':')}</p>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="rounded-md border p-4 border-[hsl(var(--border))]">
                          <ul className="list-disc pl-6 space-y-1">
                            {block.points.map((p) => (<li key={p}>{p}</li>))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>
          ) : (
            <section>
              <article className="space-y-8 text-gray-300">
                {blocks.map((block, i) => (
                  <section key={block.heading} className="space-y-3">
                    <h2 className="text-xl font-semibold text-white">{block.heading}</h2>
                    <ul className="list-disc pl-6 space-y-1">
                      {block.points.map((p) => (<li key={p}>{p}</li>))}
                    </ul>
                    {i < blocks.length - 1 && (
                      <div className="h-px bg-[hsl(var(--border))]/40 mt-4" />
                    )}
                  </section>
                ))}
              </article>
            </section>
          )}

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <AccentPanel tone="green" variant="subtle">
                {Array.isArray(summary) && summary.length > 0 ? (
                  <ul className="list-disc pl-6 space-y-1">
                    {summary.map((s) => (<li key={s}>{s}</li>))}
                  </ul>
                ) : typeof summary === 'string' && summary.trim().length > 0 ? (
                  <p>{summary}</p>
                ) : (
                  <p>Key points align with BS 5839-1 and BS 7671 requirements in the UK context.</p>
                )}
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
              <Link to="/study-centre/upskilling/fire-alarm-module-6">
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

export default FireAlarmModule6SectionTemplate;
