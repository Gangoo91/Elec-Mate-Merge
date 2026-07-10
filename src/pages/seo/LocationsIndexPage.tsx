import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { LOCAL_PAGES_INDEX } from '@/data/localPagesIndex';

const PAGE_TITLE = 'Electrical Guides by City | EICR, Rewires, EV Charging';
const PAGE_DESCRIPTION =
  'Local UK electrical guides by city: EICR costs, consumer unit replacement, rewire costs, EV charger installation, landlord safety and electrician pay.';

export default function LocationsIndexPage() {
  useSEO({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Locations', url: '/locations' },
    ],
    dateModified: '2026-07-10',
    author: 'Andrew Moore',
  });

  return (
    <PublicPageLayout>
      <section className="py-14 px-5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Electrical guides by <span className="text-yellow-400">city</span>
          </h1>
          <p className="mt-4 text-white/75 leading-relaxed max-w-3xl">
            Costs and rules for electrical work vary around the UK — labour rates, DNO areas, and
            local demand all move the numbers. These pages cover the most-searched electrical jobs
            city by city. For the national picture, start with the{' '}
            <SEOInternalLink href="/guides">guides library</SEOInternalLink>.
          </p>

          {LOCAL_PAGES_INDEX.map((series) => (
            <div key={series.heading} className="mt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white">{series.heading}</h2>
              <p className="mt-1 text-[14px] text-white/60">{series.description}</p>
              <ul className="mt-4 columns-2 md:columns-3 lg:columns-4 gap-x-6">
                {series.pages.map((page) => (
                  <li key={page.path} className="break-inside-avoid">
                    <Link
                      to={page.path}
                      className="block py-1 text-[13px] leading-snug text-white/70 hover:text-yellow-300 transition-colors touch-manipulation"
                    >
                      {page.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <SEOCTASection
        heading="Wherever you work, the tools are the same"
        subheading="Certificates, quoting, calculators and training in one app — built for UK electricians in every city."
      />
    </PublicPageLayout>
  );
}
