import { JsonLd } from '@/components/seo/JsonLd';
import { PANEL, LABEL } from '@/components/seo/seoSurface';

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
 *
 * Design: this is the most authoritative thing on the page, so it reads as a
 * stated answer, not a tip card — a labelled panel with the answer set larger
 * than body copy. No icon: the "The short answer" label does that job in type
 * and doubles as a scent marker for someone skimming in from a SERP.
 */
export function SEOAnswerBox({ question, answer, detail, speakable = true }: SEOAnswerBoxProps) {
  return (
    <div className={`seo-answer-box ${PANEL} px-4 py-6 sm:px-7 sm:py-7`}>
      {speakable && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            // validate-schemas.mjs requires name on WebPage — the question is
            // the most descriptive name this component can know.
            name: question,
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['.seo-answer-box__q', '.seo-answer-box__a'],
            },
          }}
        />
      )}
      <p className={`${LABEL} text-white`}>The short answer</p>
      <h2 className="seo-answer-box__q mt-3 text-left text-[21px] font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-[25px]">
        {question}
      </h2>
      <p className="seo-answer-box__a mt-4 max-w-[62ch] text-left text-[16.5px] leading-relaxed text-white sm:text-[17.5px]">
        {answer}
      </p>
      {detail && (
        <p className="mt-4 max-w-[62ch] border-t border-white/[0.08] pt-4 text-left text-[14.5px] leading-relaxed text-white">
          {detail}
        </p>
      )}
    </div>
  );
}
