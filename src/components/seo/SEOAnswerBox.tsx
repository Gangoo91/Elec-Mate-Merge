import { Helmet } from 'react-helmet';
import { CheckCircle2 } from 'lucide-react';

interface SEOAnswerBoxProps {
  /** The exact question searchers/AI engines ask — rendered as an H2 heading. */
  question: string;
  /** A direct, self-contained answer (ideally 40-60 words). This is what wins
   *  featured snippets and gets cited by AI Overviews / ChatGPT / Perplexity. */
  answer: string;
  /** Optional supporting detail rendered under the lead answer. */
  detail?: string;
  /** Emit Speakable schema for voice assistants / AI answer engines (default on). */
  speakable?: boolean;
}

/**
 * Answer-first block placed directly under the page H1.
 *
 * Two jobs:
 *  1. SEO — gives Google a clean, extractable answer to win the featured snippet
 *     and AI Overview citation (lifts CTR on page-1 results).
 *  2. GEO — the `question` heading + concise `answer` is the exact shape LLM answer
 *     engines quote. Speakable schema marks it up for voice/AI extraction.
 */
export function SEOAnswerBox({ question, answer, detail, speakable = true }: SEOAnswerBoxProps) {
  return (
    <div className="seo-answer-box rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 sm:p-6">
      {speakable && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['.seo-answer-box__q', '.seo-answer-box__a'],
              },
            })}
          </script>
        </Helmet>
      )}
      <div className="flex items-start gap-2.5">
        <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-1" />
        <div className="flex-1 min-w-0">
          <h2 className="seo-answer-box__q font-bold text-white text-lg sm:text-xl leading-snug text-left">
            {question}
          </h2>
          <p className="seo-answer-box__a mt-2.5 text-white/90 text-base leading-relaxed text-left">
            {answer}
          </p>
          {detail && (
            <p className="mt-2 text-white/70 text-sm leading-relaxed text-left">{detail}</p>
          )}
        </div>
      </div>
    </div>
  );
}
