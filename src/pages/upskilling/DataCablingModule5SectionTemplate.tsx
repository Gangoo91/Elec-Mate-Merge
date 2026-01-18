import { useEffect, useMemo } from 'react';
import { ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import type { QuizQuestion } from '@/types/quiz';

const DataCablingModule5SectionTemplate = ({
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
}) => {
  // SEO per section
  useEffect(() => {
    document.title = `${title} | Data Cabling Module 5 ${sectionNumber}`;
    const desc = description;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    if (meta) meta.content = desc;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    if (canonical) canonical.href = window.location.href;

    const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: title, description: desc, about: [title, 'Data Cabling', 'BS 7671'], author: { '@type': 'Organisation', name: 'Training Module' } };
    const script = document.createElement('script'); script.type = 'application/ld+json'; script.text = JSON.stringify(ld); document.head.appendChild(script);
    return () => { if (script && script.parentNode) script.parentNode.removeChild(script); };
  }, [title, description, sectionNumber]);

  const sequentialQuestions = useMemo(() => quiz.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })), [quiz]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/data-cabling-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centred Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Zap className="h-4 w-4" />
              <span>Module 5 Section {sectionNumber}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              {title}
            </h1>
            <p className="text-white/80">
              {description}
            </p>
            {badges.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {badges.map((b) => (
                  <span key={b} className="px-3 py-1 text-xs rounded-full bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/30">{b}</span>
                ))}
              </div>
            )}
          </header>

          {/* Quick Summary Boxes */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
              <p className="text-sm text-white">{intro}</p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Topics</p>
              <ul className="text-sm text-white space-y-1">
                {blocks.slice(0, 3).map((block) => (
                  <li key={block.heading}><strong>{block.heading}</strong></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {learnings.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-white">
                  <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-white/5 mb-12" />

          {/* Content Blocks */}
          {blocks.map((block, index) => (
            <section key={block.heading} className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="text-elec-yellow/80 text-sm font-normal">{String(index + 1).padStart(2, '0')}</span>
                {block.heading}
              </h2>
              <div className="text-white space-y-4 leading-relaxed">
                <ul className="text-sm text-white space-y-2 ml-4">
                  {block.points.map((p, pIndex) => (
                    <li key={pIndex}>{p}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">{String(blocks.length + 1).padStart(2, '0')}</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              {Array.isArray(summary) && summary.length > 0 ? (
                <ul className="text-sm text-white space-y-2">
                  {summary.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : typeof summary === 'string' && summary.trim().length > 0 ? (
                <p className="text-sm text-white">{summary}</p>
              ) : (
                <p className="text-sm text-white">Key points align with industry standards and BS 7671 requirements in the UK context.</p>
              )}
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={sequentialQuestions} title="Knowledge Check" />
          </section>

          {/* Bottom Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            {prev ? (
              <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
                <Link to={prev}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Section
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
                <Link to="/electrician/upskilling/data-cabling-module-5">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
            )}
            {next ? (
              <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
                <Link to={next}>
                  Next Section
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
                <Link to="/electrician/upskilling/data-cabling-module-5">
                  Module Overview
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </article>
    </div>
  );
};

export default DataCablingModule5SectionTemplate;
