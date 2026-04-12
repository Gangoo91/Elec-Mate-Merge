import type { ReactNode } from 'react';
import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  BookOpen,
  Building2,
  Calculator,
  Cable,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Gauge,
  Home,
  PoundSterling,
  Search,
  ShieldCheck,
  Wrench,
  Zap,
} from 'lucide-react';

const iconMap = {
  AlertTriangle,
  BookOpen,
  Building2,
  Calculator,
  Cable,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Gauge,
  Home,
  PoundSterling,
  Search,
  ShieldCheck,
  Wrench,
  Zap,
};

type IconName = keyof typeof iconMap;
type BlockTone = 'default' | 'info' | 'success' | 'warning' | 'pricing';

interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

interface ListBlock {
  type: 'list';
  items: string[];
  tone?: BlockTone;
  ordered?: boolean;
}

interface CalloutBlock {
  type: 'callout';
  title: string;
  text: string;
  tone?: BlockTone;
}

type GeneratedGuideBlock = ParagraphBlock | ListBlock | CalloutBlock;

interface GeneratedGuideSection {
  id: string;
  heading: string;
  blocks: GeneratedGuideBlock[];
  tocLabel?: string;
}

interface GeneratedGuideFAQ {
  question: string;
  answer: string;
}

interface GeneratedGuideHowToStep {
  name: string;
  text: string;
}

interface GeneratedGuideRelatedPage {
  href: string;
  title: string;
  description: string;
  icon: IconName;
  category: RelatedPage['category'];
}

export interface GeneratedGuideConfig {
  pagePath: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  readingTime: number;
  badge?: string;
  badgeIcon?: IconName;
  breadcrumbLabel: string;
  heroPrefix: string;
  heroHighlight?: string;
  heroSuffix?: string;
  heroSubtitle: string;
  keyTakeaways?: string[];
  sections: GeneratedGuideSection[];
  howToSteps?: GeneratedGuideHowToStep[];
  howToHeading?: string;
  howToDescription?: string;
  faqs: GeneratedGuideFAQ[];
  faqHeading?: string;
  relatedPages: GeneratedGuideRelatedPage[];
  ctaHeading?: string;
  ctaSubheading?: string;
}

function renderRichText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match = pattern.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    nodes.push(
      <SEOInternalLink key={`${match[2]}-${match.index}`} href={match[2]}>
        {match[1]}
      </SEOInternalLink>
    );

    lastIndex = match.index + match[0].length;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function getToneClasses(tone: BlockTone) {
  switch (tone) {
    case 'info':
      return {
        box: 'bg-blue-500/10 border-blue-500/20',
        title: 'text-blue-300',
        icon: 'text-blue-400',
      };
    case 'success':
      return {
        box: 'bg-emerald-500/10 border-emerald-500/20',
        title: 'text-emerald-300',
        icon: 'text-emerald-400',
      };
    case 'warning':
      return {
        box: 'bg-red-500/10 border-red-500/20',
        title: 'text-red-300',
        icon: 'text-red-400',
      };
    case 'pricing':
      return {
        box: 'bg-yellow-500/10 border-yellow-500/20',
        title: 'text-yellow-300',
        icon: 'text-yellow-400',
      };
    default:
      return {
        box: 'bg-white/[0.04] border-white/10',
        title: 'text-white',
        icon: 'text-yellow-400',
      };
  }
}

function getListIcon(tone: BlockTone) {
  if (tone === 'warning') return AlertTriangle;
  if (tone === 'pricing') return PoundSterling;
  return CheckCircle2;
}

function renderBlock(block: GeneratedGuideBlock, index: number) {
  if (block.type === 'paragraph') {
    return (
      <p key={index} className="text-white leading-relaxed">
        {renderRichText(block.text)}
      </p>
    );
  }

  if (block.type === 'callout') {
    const tone = block.tone ?? 'info';
    const styles = getToneClasses(tone);
    const Icon = tone === 'warning' ? AlertTriangle : tone === 'pricing' ? PoundSterling : Zap;

    return (
      <div key={index} className={`rounded-2xl border p-5 my-4 ${styles.box}`}>
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${styles.icon}`} />
          <div>
            <h3 className={`font-bold mb-2 ${styles.title}`}>{block.title}</h3>
            <p className="text-white leading-relaxed">{renderRichText(block.text)}</p>
          </div>
        </div>
      </div>
    );
  }

  const tone = block.tone ?? 'default';
  const styles = getToneClasses(tone);
  const Icon = getListIcon(tone);

  if (block.ordered) {
    return (
      <ol key={index} className="space-y-3 my-4 pl-6 list-decimal text-white">
        {block.items.map((item) => (
          <li key={item}>{renderRichText(item)}</li>
        ))}
      </ol>
    );
  }

  return (
    <div key={index} className={`rounded-2xl border p-6 my-4 ${styles.box}`}>
      <ul className="space-y-4 text-white">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${styles.icon}`} />
            <span>{renderRichText(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderHeroTitle(config: GeneratedGuideConfig) {
  return (
    <>
      {config.heroPrefix}
      {config.heroHighlight ? (
        <>
          {' '}
          <span className="text-yellow-400">{config.heroHighlight}</span>
        </>
      ) : null}
      {config.heroSuffix ? <> {config.heroSuffix}</> : null}
    </>
  );
}

export default function GeneratedGuidePage({ config }: { config: GeneratedGuideConfig }) {
  const sections = config.sections.map((section) => ({
    id: section.id,
    heading: section.heading,
    content: <>{section.blocks.map((block, index) => renderBlock(block, index))}</>,
  }));

  const tocItems = config.sections.map((section) => ({
    id: section.id,
    label: section.tocLabel ?? section.heading,
  }));

  if (config.howToSteps?.length) {
    tocItems.push({ id: 'how-to', label: config.howToHeading ?? 'How to work through it' });
  }

  if (config.faqs.length) {
    tocItems.push({ id: 'faq', label: 'FAQ' });
  }

  if (config.relatedPages.length) {
    tocItems.push({ id: 'related', label: 'Related pages' });
  }

  return (
    <GuideTemplate
      title={config.title}
      description={config.description}
      datePublished={config.datePublished}
      dateModified={config.dateModified}
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: config.breadcrumbLabel, href: config.pagePath },
      ]}
      tocItems={tocItems}
      badge={config.badge}
      badgeIcon={config.badgeIcon ? iconMap[config.badgeIcon] : undefined}
      heroTitle={renderHeroTitle(config)}
      heroSubtitle={config.heroSubtitle}
      readingTime={config.readingTime}
      keyTakeaways={config.keyTakeaways}
      sections={sections}
      howToSteps={config.howToSteps}
      howToHeading={config.howToHeading}
      howToDescription={config.howToDescription}
      faqs={config.faqs}
      faqHeading={config.faqHeading}
      relatedPages={config.relatedPages.map((page) => ({
        ...page,
        icon: iconMap[page.icon],
      }))}
      ctaHeading={config.ctaHeading}
      ctaSubheading={config.ctaSubheading}
    />
  );
}
