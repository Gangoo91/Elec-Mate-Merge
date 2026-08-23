/**
 * InsuranceProviderDirectory — factual reference list of UK providers that
 * sell insurance to electricians, for /guides/electrician-insurance-uk.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * REGULATORY BOUNDARY — READ BEFORE EDITING
 * ─────────────────────────────────────────────────────────────────────────
 * Arranging or advising on insurance is a regulated activity (FSMA/RAO
 * art. 25(1), 25(2), 53(1); FCA PERG 5.2.8G). Elec-Mate is NOT FCA authorised.
 * The art. 33 "introducing" exclusion is expressly DISAPPLIED for contracts of
 * insurance (PERG 5.11.3G / RAO art. 33(d)) — it cannot be relied on here.
 *
 * What keeps this section lawful is RAO art. 33B (provision of information):
 * it excludes the activity where it "consists of the provision of information
 * to a potential policyholder about ... a contract of insurance, or a relevant
 * insurer or insurance or reinsurance intermediary", PROVIDED the publisher
 * "does not take any step other than the provision of information to assist in
 * the conclusion of a contract of insurance" (art. 33B(3)). PERG 5.6.4G treats
 * a "mere passive display" of insurance literature as outside art. 25(2).
 *
 * Therefore this component MUST NOT, now or ever:
 *   · rank providers, or call any of them "best", "recommended" or "right for you"
 *     (that is advising — RAO art. 53(1));
 *   · carry affiliate links, commission, paid placement or tracking parameters;
 *   · capture any user detail or pass leads to a provider;
 *   · embed a quote form or otherwise assist with an application.
 * Presentation order is alphabetical within groups and must stay that way.
 *
 * If Elec-Mate ever wants commission, the established route in this sector is
 * Introducer Appointed Representative of an authorised principal — which is
 * exactly how NICEIC does it (Certsure LLP is an IAR of Marsh Ltd). That needs
 * FCA-experienced legal sign-off first.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ACCURACY
 * ─────────────────────────────────────────────────────────────────────────
 * Every fact below was taken from the provider's own website on 23 Aug 2026.
 * FRNs are published ONLY where the provider states them on their own site —
 * Hiscox and NAPIT Insurance do not, so no FRN is shown for them.
 * NO PRICES are published: starting prices change constantly and several
 * providers contradicted themselves across their own pages. Do not add them.
 * Re-verify before changing anything here.
 */
import { ExternalLink, ShieldCheck, Info } from 'lucide-react';

const VERIFIED_ON = '23 August 2026';

interface Provider {
  name: string;
  legal?: string;
  url: string;
  frn?: string;
  type: 'Insurer' | 'Broker' | 'Comparison';
  cover: string;
  note?: string;
}

/** Alphabetical within each group — never reorder into a ranking. */
const SCHEME_LINKED: Provider[] = [
  {
    name: 'NAPIT Insurance',
    legal: 'Trading style of Partners& Limited',
    url: 'https://www.napitinsurance.co.uk/insurance-for-electrical-contractors/',
    type: 'Broker',
    cover: 'Public liability, employers liability, professional indemnity, tools, contract works, personal accident, cyber',
    note: 'Built around NAPIT membership. FCA authorisation is stated on their site but no firm reference number is published there — ask them for it and check the FCA Register.',
  },
  {
    name: 'NICEIC Insurance Services',
    legal: 'Trading name of Marsh Ltd',
    url: 'https://www.niceicinsurance.com/',
    frn: '307511',
    type: 'Broker',
    cover: 'Public liability £2m/£5m/£10m, professional indemnity from £300,000, employers liability up to £10m, tools £1,500–£10,000, efficacy, corporate manslaughter',
    note: 'States a 10% discount for registered NICEIC contractors, and EV charging installation cover included as standard. Certsure LLP (which runs the NICEIC scheme) is an Introducer Appointed Representative of Marsh Ltd — Marsh is the regulated broker.',
  },
];

const INSURERS: Provider[] = [
  {
    name: 'AXA',
    legal: 'AXA Insurance UK plc',
    url: 'https://www.axa.co.uk/business-insurance/electricians/',
    frn: '202312',
    type: 'Insurer',
    cover: 'Public liability £1m–£10m, employers liability £10m as standard, tools and contract works optional',
  },
  {
    name: 'Direct Line for Business',
    legal: 'U K Insurance Limited',
    url: 'https://www.directlineforbusiness.co.uk/tradesman-insurance/electricians',
    frn: '202810',
    type: 'Insurer',
    cover: 'Public liability £1m–£10m, employers liability £10m standard, professional indemnity, tools £10,000 per claim (£1,500 single item), contract works',
  },
  {
    name: 'Hiscox',
    legal: 'Hiscox Underwriting Ltd / Hiscox Insurance Company Ltd',
    url: 'https://www.hiscox.co.uk/business-insurance/electricians',
    type: 'Insurer',
    cover: 'Public liability up to £10m, professional indemnity, employers liability, tools, business contents, cyber and data',
    note: 'FCA and PRA regulation is stated on their site, but no firm reference number is published there — look the company up on the FCA Register directly.',
  },
  {
    name: 'Markel Direct',
    legal: 'Markel International Insurance Company Limited',
    url: 'https://www.markeluk.com/business-insurance/electricians-insurance',
    frn: '202570',
    type: 'Insurer',
    cover: 'Public liability up to £5m, employers liability up to £10m, professional indemnity, tools £1,000–£5,000, legal expenses £100,000, contract works, plant',
  },
];

const BROKERS: Provider[] = [
  {
    name: 'Constructaquote',
    legal: 'Trading name of Moorhouse Group Limited',
    url: 'https://www.constructaquote.com/insurance/electricians-insurance/',
    frn: '308035',
    type: 'Broker',
    cover: 'Public liability £1m–£10m+, employers liability, contractors all risks, goods in transit, tools, plant',
    note: 'Publishes its insurer panel: AIG, Aviva, AXA, Companion, Covea, HSB, Markel, NIG, SAGIC, Tokio, Toledo and Zurich.',
  },
  {
    name: 'Everywhen',
    legal: 'Trading name of Advisory Insurance Brokers Limited — formerly Towergate',
    url: 'https://www.everywhen.co.uk/trade-specific-insurance/electricians-insurance',
    frn: '313250',
    type: 'Broker',
    cover: 'Public liability £1m–£10m, professional indemnity up to £5m, products liability, efficacy, tools, employers liability, legal',
    note: 'Towergate rebranded to Everywhen; the old domain now redirects here.',
  },
  {
    name: 'Rhino Trade Insurance',
    legal: 'Trading style of Rhino Protect Limited',
    url: 'https://www.rhinotradeinsurance.com/trades-covered/electrician-insurance/',
    frn: '772055',
    type: 'Broker',
    cover: 'Public liability £1m–£5m, tools up to £7,500, employers liability, professional indemnity, legal expenses, personal accident, income protection',
  },
  {
    name: 'Simply Business',
    legal: 'Trading name of Xbridge Limited',
    url: 'https://www.simplybusiness.co.uk/insurance/electricians/',
    frn: '313348',
    type: 'Broker',
    cover: 'Public liability, employers liability, professional indemnity, tools, contract works, stock, plant, legal expenses, personal accident',
  },
  {
    name: 'Superscript',
    legal: 'Trading name of Enro Limited',
    url: 'https://gosuperscript.com/business-insurance/electricians-insurance/',
    frn: '656459',
    type: 'Broker',
    cover: 'Public liability £1m/£2m/£5m, employers liability £10m standard, tools up to £10,000 (£1,000 per item), contract works up to £500,000, professional indemnity',
  },
  {
    name: 'Trade Direct Insurance',
    legal: 'Trade Direct Insurance Services Ltd',
    url: 'https://www.tradedirectinsurance.co.uk/insurance-by-trade/electricians-liability-insurance/',
    frn: '307734',
    type: 'Broker',
    cover: 'Public liability up to £5m, employers liability £10m, professional indemnity £100,000, tools up to £15,000, financial loss £100,000',
    note: 'States its policies are underwritten by Zurich Insurance Company Ltd, and offers a two-year price freeze.',
  },
  {
    name: 'Tradesman Saver',
    legal: 'Trading name of Barkdene Limited (also trades as Electrician Saver)',
    url: 'https://www.tradesmansaver.co.uk/electricians-insurance/',
    frn: '303965',
    type: 'Broker',
    cover: 'Public liability £1m standard (£2m/£5m/£10m options), products liability, legal expenses £250,000, financial loss; optional employers liability, professional indemnity, tools',
  },
];

const cardCn =
  'rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-4 sm:p-5';

function ProviderCard({ p }: { p: Provider }) {
  return (
    <div className={`${cardCn} flex flex-col`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-[15px] font-bold leading-snug text-white">{p.name}</h4>
          {p.legal ? <p className="mt-0.5 text-[12px] leading-snug text-white">{p.legal}</p> : null}
        </div>
        <span className="shrink-0 rounded-md border border-white/[0.14] bg-white/[0.05] px-2 py-0.5 text-[11px] font-semibold text-white">
          {p.type}
        </span>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-white">
        <span className="font-semibold text-elec-yellow">Cover offered: </span>
        {p.cover}
      </p>

      {p.note ? (
        <p className="mt-2 text-[12.5px] leading-relaxed text-white">{p.note}</p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.08] pt-3">
        <a
          href={p.url}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 text-[13.5px] font-semibold text-elec-yellow hover:underline touch-manipulation"
        >
          Visit their electricians page
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
        {p.frn ? (
          <span className="text-[12px] text-white">
            FCA firm reference <strong className="text-white">{p.frn}</strong>
          </span>
        ) : null}
      </div>
    </div>
  );
}

function Group({ title, blurb, items }: { title: string; blurb: string; items: Provider[] }) {
  return (
    <section className="mt-7">
      <h3 className="text-[15px] font-bold text-white sm:text-[16px]">{title}</h3>
      <p className="mt-1 max-w-[70ch] text-[13.5px] leading-relaxed text-white">{blurb}</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2 xl:gap-4">
        {items.map((p) => (
          <ProviderCard key={p.name} p={p} />
        ))}
      </div>
    </section>
  );
}

export default function InsuranceProviderDirectory() {
  return (
    <div className="-mx-4 border-y border-white/[0.14] bg-white/[0.02] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5 lg:p-6">
      <h3 className="text-[17px] font-bold tracking-tight text-white sm:text-[19px]">
        Where UK electricians actually buy cover
      </h3>
      <p className="mt-1.5 max-w-[75ch] text-sm leading-relaxed text-white">
        Providers with a dedicated electrician or trades product, listed alphabetically within each
        group with their FCA firm reference number so you can verify them yourself. This is
        information, not a recommendation — we are not an insurance broker, we earn nothing from
        these links, and we have no view on which is right for you.
      </p>

      {/* Groups are ordered alphabetically, like the cards within them. Leading
          with any one group — or calling it the only product of its kind — reads
          as steering rather than the neutral display the art. 33B position
          depends on. Keep both the order and the wording descriptive. */}
      <Group
        title="Brokers and intermediaries"
        blurb="They arrange cover on your behalf, usually across a panel of insurers. Ask which insurers they use and whether they are paid by commission."
        items={BROKERS}
      />
      <Group
        title="Insurers selling direct"
        blurb="You buy from the insurer itself rather than through an intermediary."
        items={INSURERS}
      />
      <Group
        title="Tied to the competent person schemes"
        blurb="Both are arranged around membership of an electrical competent person scheme."
        items={SCHEME_LINKED}
      />

      {/* Verification advice — the genuinely useful, non-regulated bit */}
      <div className="mt-7 rounded-2xl border border-elec-yellow/25 bg-elec-yellow/[0.06] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-elec-yellow" aria-hidden />
          <div>
            <h4 className="text-[15px] font-bold text-white">
              Check any provider on the FCA Register before you pay
            </h4>
            <p className="mt-1.5 max-w-[72ch] text-[13.5px] leading-relaxed text-white">
              Anyone arranging insurance in the UK must be authorised by the Financial Conduct
              Authority. Search the firm reference number at{' '}
              <a
                href="https://register.fca.org.uk/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="font-semibold text-elec-yellow underline underline-offset-2 touch-manipulation"
              >
                register.fca.org.uk
              </a>{' '}
              and confirm three things: the firm is authorised, the permissions cover insurance
              distribution, and the trading name you are dealing with is listed against that firm.
              If a firm cannot give you a reference number, do not hand over money.
            </p>
            <p className="mt-2 max-w-[72ch] text-[13.5px] leading-relaxed text-white">
              Worth asking any broker: which insurers are on your panel, are you paid commission on
              this policy, what is the excess, and does the tools cover apply when the van is left
              unattended overnight?
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
        <p className="text-[12px] leading-relaxed text-white">
          Details taken from each provider&rsquo;s own website on {VERIFIED_ON} and shortened —
          always read the policy wording and the IPID before buying, as cover, limits and exclusions
          change. Prices are deliberately not listed here because they move constantly. Elec-Mate is
          not authorised or regulated by the Financial Conduct Authority, receives no commission or
          referral fee from any provider on this page, and does not provide insurance advice.
        </p>
      </div>
    </div>
  );
}
