import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://elec-mate.co.uk';
const DEFAULT_TITLE = 'Elec-Mate | UK Electrical Certification & Apprentice Training Platform';
const DEFAULT_DESCRIPTION = 'The #1 UK platform for electricians and apprentices. EICR & EIC certification software, BS 7671 training, off-job learning hours tracking, AI-powered tools, and professional community.';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

interface SEOOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
  schema?: Record<string, unknown>;
}

/**
 * Comprehensive SEO hook that sets document title, meta tags, OG tags, canonical URL, and JSON-LD schema
 */
const useSEO = (options: SEOOptions | string = {}, legacyDescription?: string) => {
  const location = useLocation();

  // Support legacy usage: useSEO('Title', 'Description')
  const config: SEOOptions = typeof options === 'string'
    ? { title: options, description: legacyDescription }
    : options;

  const {
    title,
    description,
    image,
    type = 'website',
    noindex = false,
    schema,
  } = config;

  useEffect(() => {
    const fullTitle = title ? `${title} | Elec-Mate` : DEFAULT_TITLE;
    const fullDescription = description || DEFAULT_DESCRIPTION;
    const fullImage = image || DEFAULT_IMAGE;
    const canonicalUrl = `${BASE_URL}${location.pathname}`;

    // Set document title
    document.title = fullTitle;

    // Helper to set/update meta tag
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set/update link tag
    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Primary meta tags
    setMeta('description', fullDescription);
    setMeta('title', fullTitle);

    // Robots
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Canonical URL
    setLink('canonical', canonicalUrl);

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', fullDescription, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:image', fullImage, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', 'Elec-Mate', true);
    setMeta('og:locale', 'en_GB', true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', fullDescription);
    setMeta('twitter:image', fullImage);
    setMeta('twitter:url', canonicalUrl);

    // JSON-LD Schema
    if (schema) {
      // Remove existing dynamic schema
      const existingSchema = document.querySelector('script[data-seo-schema]');
      if (existingSchema) {
        existingSchema.remove();
      }

      // Add new schema
      const scriptElement = document.createElement('script');
      scriptElement.type = 'application/ld+json';
      scriptElement.setAttribute('data-seo-schema', 'true');
      scriptElement.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        ...schema,
      });
      document.head.appendChild(scriptElement);
    }

    // Cleanup dynamic schema on unmount
    return () => {
      if (schema) {
        const dynamicSchema = document.querySelector('script[data-seo-schema]');
        if (dynamicSchema) {
          dynamicSchema.remove();
        }
      }
    };
  }, [title, description, image, type, noindex, schema, location.pathname]);
};

/**
 * Pre-built schema generators for common page types
 */
export const SEOSchemas = {
  course: (name: string, description: string, provider = 'Elec-Mate') => ({
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: BASE_URL,
    },
    educationalLevel: 'Professional',
    inLanguage: 'en-GB',
  }),

  article: (title: string, description: string, datePublished: string, author = 'Elec-Mate') => ({
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.jpg`,
      },
    },
  }),

  faqPage: (faqs: Array<{ question: string; answer: string }>) => ({
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }),

  breadcrumbs: (items: Array<{ name: string; url: string }>) => ({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }),

  howTo: (name: string, description: string, steps: Array<{ name: string; text: string }>) => ({
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }),
};

export default useSEO;
