import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Phone,
  Zap,
  FileCheck2,
  Home,
  Search,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Safety', href: '/electrical-safety-at-home' },
  { label: 'Finding an Emergency Electrician', href: '/finding-emergency-electrician' },
];

const tocItems = [
  { id: 'what-is-an-emergency', label: 'What Counts as an Electrical Emergency' },
  { id: 'immediate-steps', label: 'Safe Steps to Take First' },
  { id: 'finding-a-24-7-electrician', label: 'Finding a 24/7 Registered Electrician' },
  { id: 'verifying-registration', label: 'Verifying Registration' },
  { id: 'callout-rates', label: 'Emergency Callout Rates' },
  { id: 'avoiding-cowboy-builders', label: 'Avoiding Cowboy Builders' },
  { id: 'after-the-emergency', label: 'After the Emergency' },
  { id: 'for-electricians', label: 'For Electricians Offering Emergency Cover' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'True electrical emergencies include sparking or burning sockets, burning smells from wiring, total power loss (not a power cut), flooding or water near electrics, and any situation where someone has received an electric shock.',
  'Before calling an electrician, isolate the circuit or turn off the main switch at the consumer unit if safe to do so — do not touch any damaged fittings or wet electrical equipment.',
  'Only use NICEIC or NAPIT registered electricians for emergency work — registration can be verified online in seconds.',
  'Emergency electrician callout rates in the UK typically range from £100 to £200 for the callout fee, plus £50 to £100 per hour for the work itself.',
  'Be wary of electricians found via door-to-door canvassing or non-verified online adverts — always verify NICEIC or NAPIT registration before allowing work to begin.',
  'After any electrical emergency, have a full Electrical Installation Condition Report (EICR) carried out to ensure the whole installation is safe.',
];

const faqs = [
  {
    question: 'What counts as an electrical emergency?',
    answer:
      "A true electrical emergency is one that presents an immediate risk to life or property. This includes: sparking from a socket, switch, or consumer unit; a burning smell from wiring, fittings, or the consumer unit; an electrical fire; flooding or water that has contacted electrical equipment; total loss of power in your property that is not caused by a local power cut (check 105 or your DNO's website first); and any situation where a person has received an electric shock. Nuisance problems such as a single circuit being off or a light not working are not emergencies and can wait for a standard appointment.",
  },
  {
    question: 'Should I call 999 or an electrician first?',
    answer:
      'If there is an immediate risk to life — a fire, someone who has been electrocuted and is unresponsive, or an ongoing situation you cannot safely control — call 999 first. The fire brigade is trained to deal with electrical fires and can isolate the supply from outside the building. Once the immediate danger is controlled, call a registered electrician to make the installation safe before power is restored.',
  },
  {
    question: 'How do I find a 24-hour emergency electrician?',
    answer:
      'The NICEIC and NAPIT online registers both allow you to search for registered electricians in your area. Some entries indicate whether the contractor offers 24/7 emergency cover. You can also call the NICEIC consumer helpline. In addition, many insurance companies and home assistance policies (such as British Gas HomeCare) include 24/7 emergency electrician cover as part of the policy — check your policy before paying for a callout.',
  },
  {
    question: 'How much does an emergency electrician cost?',
    answer:
      'Emergency electrician callout fees in the UK typically range from £100 to £200, in addition to the hourly labour rate for the work itself (typically £50 to £100 per hour). Out-of-hours rates (evenings, weekends, bank holidays) are higher than standard daytime rates. Parts and materials are charged on top. The total cost of a typical emergency callout (attending, diagnosing, and making safe) often falls between £150 and £400 depending on location, time, and the nature of the work.',
  },
  {
    question: 'Can an emergency electrician fix the problem permanently on the same visit?',
    answer:
      'Sometimes, but not always. The priority of an emergency callout is to make the installation safe — which may mean isolating a circuit, replacing a damaged fitting, or turning off power to a section of the installation. A full repair (particularly if significant wiring work or parts ordering is required) may need to be carried out at a follow-up appointment. Ask the electrician to confirm whether the property is safe to occupy overnight and what further work is required.',
  },
  {
    question: 'What questions should I ask before hiring an emergency electrician?',
    answer:
      'Before agreeing to work, ask: Are you registered with NICEIC or NAPIT? (You can verify this online.) What is your callout fee and hourly rate? Is the rate higher because it is out-of-hours? Will you provide a written estimate before starting work? Will you issue an Electrical Installation Certificate or Minor Works Certificate for the work completed? A registered electrician should answer all of these questions confidently and without hesitation.',
  },
  {
    question: "What if my landlord won't respond to an electrical emergency?",
    answer:
      "Landlords have a legal duty to maintain electrical installations in a safe condition. If your landlord is unresponsive to a genuine electrical emergency, contact your local council's environmental health team (who have emergency out-of-hours lines) and report the unsafe conditions. In extreme cases, you may be entitled to arrange emergency repairs yourself and recover costs from the landlord, but take legal advice before doing so. Electrical Safety First also has a helpline for tenants.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-safety-at-home',
    title: 'Electrical Safety at Home',
    description:
      'Complete guide to home electrical safety including RCD testing and common hazards.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/electric-shock-first-aid',
    title: 'Electric Shock First Aid',
    description: 'What to do if someone receives an electric shock — critical first aid steps.',
    icon: AlertTriangle,
    category: 'Safety',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord electrical safety obligations and EICR requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-an-emergency',
    heading: 'What Counts as an Electrical Emergency',
    content: (
      <>
        <p>
          Not every electrical problem is an emergency. Understanding what constitutes a genuine
          electrical emergency helps you respond appropriately — and avoid paying emergency rates
          for non-urgent work.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <p className="font-semibold text-white mb-3">Genuine electrical emergencies:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sparking</strong> from a socket, switch, consumer unit, or appliance
                connection
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell</strong> from wiring, fittings, or the consumer unit —
                particularly a distinctive acrid electrical burning smell
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical fire</strong> — call 999 first, then an electrician
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water on electrics</strong> — flooding, burst pipes, or roof leaks that have
                reached electrical fittings or the consumer unit
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total power loss</strong> that is not a local network outage (check by
                calling 105 — the free DNO fault line — or checking your area on the DNO's website)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric shock</strong> — anyone who has received an electric shock requires
                medical attention; call 999 immediately
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <p className="font-semibold text-white mb-3">
            Non-emergency situations (can wait for a standard appointment):
          </p>
          <ul className="space-y-2 text-white">
            <li>A single light circuit has tripped off</li>
            <li>A light bulb or fitting needs replacing</li>
            <li>A single socket is not working</li>
            <li>A USB socket is not charging</li>
            <li>Occasional RCD tripping without a clear hazard</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'immediate-steps',
    heading: 'Safe Steps to Take Before the Electrician Arrives',
    content: (
      <>
        <p>
          Taking the right steps before the electrician arrives can reduce the risk to you and your
          household, and may make the electrician's job easier and quicker.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Turn off at the consumer unit</strong> — if it is safe to do so, turn off
                the affected circuit at the consumer unit (or the main switch to the whole
                installation). Do not touch damaged, wet, or sparking fittings to do this — only use
                the switches on the consumer unit itself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not touch wet electrics</strong> — if water has contacted electrical
                fittings, do not touch them. Turn off the main switch at the consumer unit if you
                can reach it safely without crossing the affected area. If you cannot do this
                safely, leave the building and call an electrician and, if necessary, the fire
                brigade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unplug appliances on the affected circuit</strong> — where safe, unplug
                appliances from sockets on the affected circuit. This eliminates the possibility
                that an appliance fault is the cause and reduces load on the circuit when power is
                restored.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Note what happened</strong> — note the sequence of events (what you were
                doing when the problem started, what you saw, heard, or smelled), which circuits are
                affected, and anything you have already tried. This information helps the
                electrician diagnose the fault quickly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-a-24-7-electrician',
    heading: 'Finding a 24/7 NICEIC or NAPIT Registered Electrician',
    content: (
      <>
        <p>
          In a genuine emergency, the priority is to find a registered electrician who is available
          immediately. Here is how to find one reliably.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC registered contractor search</strong> — go to
                niceic.com/find-a-contractor. You can filter by location and, in some cases, by
                emergency availability. NICEIC registration means the electrician has been assessed
                for technical competence and carries public liability insurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT registered contractor search</strong> — go to napit.org.uk and use the
                Find a Member tool. NAPIT is a government-approved competent person scheme
                equivalent to NICEIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check your home insurance policy</strong> — many home insurance and home
                assistance policies include 24/7 emergency electrician cover. Check your policy
                documents or call your insurer before paying out-of-pocket for an emergency callout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask neighbours or local community groups</strong> — a personal
                recommendation for a local electrician who has recently done good work is often more
                reliable than an internet search in an emergency situation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'verifying-registration',
    heading: 'Verifying Registration Before Work Begins',
    content: (
      <>
        <p>
          In an emergency it is tempting to accept the first electrician who responds, but taking 60
          seconds to verify registration before allowing work to begin protects you from unqualified
          or dishonest traders.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask for their NICEIC or NAPIT registration number</strong> — any registered
                electrician will know their registration number immediately. Enter it on the NICEIC
                or NAPIT website to confirm they are currently registered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask for photo ID and a business card</strong> — a legitimate electrician
                will have no objection to providing identification. Note the name, company, and
                vehicle registration before work starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get a price in writing before work starts</strong> — even in an emergency, a
                legitimate electrician will quote the callout fee and hourly rate before beginning
                work. Ask for this in writing (a text message is sufficient).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'callout-rates',
    heading: 'Emergency Electrician Callout Rates (2026)',
    content: (
      <>
        <p>
          Emergency electrician rates vary significantly by region and time of day. London and South
          East rates are consistently higher than the national average.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Callout fee</strong> — typically £100 to £200 just to attend. This covers
                the electrician's time to travel to you and the first 30 minutes or hour of their
                time. The callout fee is the same whether or not the problem can be fixed in one
                visit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hourly rate</strong> — typically £50 to £100 per hour after the initial
                callout period. Out-of-hours rates (weekends, evenings, bank holidays) are typically
                25 to 50 per cent higher than daytime rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total typical emergency callout cost</strong> — for attendance, diagnosis,
                and making safe (without significant parts), expect to pay £150 to £400. A
                straightforward fix (replacing a consumer unit main switch, for example) can easily
                exceed £500 once parts are included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>London and South East premium</strong> — London emergency rates are
                typically 20 to 40 per cent higher than the national average, with callout fees of
                £150 to £250 being common.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'avoiding-cowboy-builders',
    heading: 'Avoiding Cowboy Builders and Unregistered Traders',
    content: (
      <>
        <p>
          Electrical emergencies create vulnerability to unscrupulous traders who charge high rates
          for poor or dangerous work. These are the warning signs to watch for.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cannot provide a registration number</strong> — any legitimate electrician
                registered with NICEIC, NAPIT, or ELECSA will know their registration number
                immediately and will not hesitate to provide it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Demands cash payment upfront</strong> — legitimate tradespeople invoice
                after work is completed or request a deposit for materials, not large upfront cash
                payments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Refuses to provide a written quote</strong> — even a text message
                confirmation of rates is better than nothing. Refusal to quote in advance of work
                starting is a warning sign.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pressure to authorise extensive work immediately</strong> — some dishonest
                traders deliberately create a sense of urgency to persuade customers to authorise
                expensive work that is not actually necessary. A legitimate electrician will make
                the installation safe and explain what further work is required, giving you time to
                consider.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No invoicing or certification</strong> — any electrical work must be
                accompanied by an appropriate certificate (Electrical Installation Certificate or
                Minor Works Certificate). If the electrician does not mention certification, ask
                specifically.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'after-the-emergency',
    heading: 'After the Emergency: What to Do Next',
    content: (
      <>
        <p>
          Once the immediate situation is resolved and the installation has been made safe, there
          are important follow-up steps to take.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Obtain a certificate for the work done</strong> — insist on an Electrical
                Installation Certificate or Minor Works Certificate for any work carried out. This
                is a legal requirement for notifiable work and provides evidence the work was done
                safely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arrange a full EICR</strong> — an electrical emergency often indicates an
                underlying issue with the installation. An{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords">
                  Electrical Installation Condition Report (EICR)
                </SEOInternalLink>{' '}
                will assess the whole installation and identify any other faults before they cause
                another emergency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notify your insurer</strong> — if the emergency resulted in damage to your
                property or its contents, contact your home insurer to discuss a claim. The
                electrician's certificate and invoice will be required evidence.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Offering Emergency Cover',
    content: (
      <>
        <p>
          Emergency electrical work commands premium rates and can be a lucrative part of an
          electrician's business. Here is how to position yourself effectively.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Make Your Registration Visible</h4>
              <p className="text-white text-sm leading-relaxed">
                Display your NICEIC or NAPIT registration prominently on your website, Google
                Business profile, and any directory listings. Customers searching for an emergency
                electrician will be reassured by clear evidence of registration.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Issue Certificates on Site</h4>
              <p className="text-white text-sm leading-relaxed">
                Use the{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Elec-Mate certificate app
                </SEOInternalLink>{' '}
                to complete and issue Minor Works Certificates and EICs on site before you leave.
                Handing the customer a certificate immediately builds trust and differentiates you
                from unregistered traders.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Issue certificates on site and quote instantly with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site certificate completion, AI board scanning, and instant PDF export. Start your 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FindingEmergencyElectricianPage() {
  return (
    <GuideTemplate
      title="Emergency Electrician UK | How to Find an Emergency Electrician"
      description="What counts as an electrical emergency, safe steps to take first, how to find a 24/7 NICEIC or NAPIT registered electrician, typical emergency callout rates (£100–200 callout fee), and how to avoid unregistered traders."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Emergency Guide"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Finding an Emergency Electrician UK:{' '}
          <span className="text-yellow-400">What to Do and Who to Call</span>
        </>
      }
      heroSubtitle="What counts as a genuine electrical emergency, the safe steps to take before the electrician arrives, how to find a 24/7 NICEIC or NAPIT registered electrician, typical callout rates, and how to avoid cowboy builders."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Emergency Electricians"
      relatedPages={relatedPages}
      ctaHeading="Are You an Electrician? Stand Out with Elec-Mate"
      ctaSubheading="Issue Minor Works Certificates and EICs on site before you leave. Join 1,000+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
