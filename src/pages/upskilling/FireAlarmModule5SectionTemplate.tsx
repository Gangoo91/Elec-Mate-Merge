import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import type { QuizQuestion } from '@/types/quiz';

const FireAlarmModule5SectionTemplate = ({
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
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useEffect(() => {
    document.title = `${title} | Fire Alarm Module 5 Section ${sectionNumber} | Elec-Mate`;
    const desc = description;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    if (meta) meta.content = desc;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    if (canonical) canonical.href = window.location.href;

    const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: title, description: desc, about: [title, 'BS 5839-1', 'BS 7671'], author: { '@type': 'Organization', name: 'Elec-Mate' } };
    const script = document.createElement('script'); script.type = 'application/ld+json'; script.text = JSON.stringify(ld); document.head.appendChild(script);
    return () => { if (script && script.parentNode) script.parentNode.removeChild(script); };
  }, [title, description, sectionNumber]);

  const sequentialQuestions = useMemo(() => quiz.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })), [quiz]);

  const summaryText = Array.isArray(summary) && summary.length > 0
    ? summary.join(' ')
    : typeof summary === 'string' && summary.trim().length > 0
    ? summary
    : 'Key points align with BS 5839-1 and BS 7671 requirements in the UK context.';

  const faqs = [
    { q: `What are the key requirements covered in ${title}?`, a: intro },
    { q: 'How does this relate to BS 5839-1 and BS 7671?', a: 'All fire alarm system wiring and installation in the UK must comply with BS 5839-1 for fire detection systems and BS 7671 for electrical installation requirements. This section covers specific requirements that support compliant installations.' },
    { q: 'What documentation is required?', a: 'Full design documentation, wiring diagrams, commissioning records, and handover certificates are required. Keep records for maintenance and future modifications.' },
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/fire-alarm-course/module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title Header - Centered */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-4">
              <Zap className="w-4 h-4 text-elec-yellow" />
              <span className="text-elec-yellow text-sm font-medium">Module 5 • Section {sectionNumber}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              {title}
            </h1>
            <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Quick Summary Boxes */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
              <ul className="text-sm text-white space-y-1">
                {learnings.slice(0, 3).map((l, i) => (
                  <li key={i}>• {l}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Spot it / Use it</p>
              <ul className="text-sm text-white space-y-1">
                <li>• Fire alarm wiring systems</li>
                <li>• System installation and testing</li>
                <li>• BS 5839-1 and BS 7671 compliance</li>
              </ul>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">What You'll Learn</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {learnings.map((l, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <p className="text-white leading-relaxed">{intro}</p>
          </section>

          {/* Content Blocks */}
          {blocks.map((block, index) => (
            <section key={block.heading} className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="text-elec-yellow/80 text-sm font-normal">{String(index + 2).padStart(2, '0')}</span>
                {block.heading}
              </h2>
              {blocksLayout === 'grid' && blocks.length > 2 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {block.points.map((p, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-white text-sm">{p}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {block.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-white">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">{String(blocks.length + 2).padStart(2, '0')}</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              {Array.isArray(summary) && summary.length > 0 ? (
                <ul className="text-white space-y-2">
                  {summary.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white">{summaryText}</p>
              )}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-white font-medium">{faq.q}</span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-white flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-4 py-3 bg-white/5">
                      <p className="text-white">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <SingleQuestionQuiz questions={sequentialQuestions} title="Knowledge Check" />
          </section>

          {/* Bottom Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[48px] px-6 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="/electrician/upskilling/fire-alarm-course/module-5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module
              </Link>
            </Button>
            {next ? (
              <Button
                size="lg"
                className="min-h-[48px] px-6 bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
                asChild
              >
                <Link to={next}>
                  Next Section
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                className="min-h-[48px] px-6 bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
                asChild
              >
                <Link to="/electrician/upskilling/fire-alarm-course/module-5">
                  Complete Module
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule5SectionTemplate;
