import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Star,
  MessageSquare,
  ShieldCheck,
  Search,
  Globe,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  BarChart3,
  Users,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/growing-electrical-business' },
  { label: 'Getting Customer Reviews', href: '/customer-reviews-electrician' },
];

const tocItems = [
  { id: 'why-reviews-matter', label: 'Why Reviews Matter' },
  { id: 'when-and-how-to-ask', label: 'When and How to Ask' },
  { id: 'google-vs-platforms', label: 'Google vs Checkatrade vs Trustpilot' },
  { id: 'negative-reviews', label: 'Dealing With Negative Reviews' },
  { id: 'qr-code-cards', label: 'QR Code Follow-Up Cards' },
  { id: 'automating-review-requests', label: 'Automating Review Requests' },
  { id: 'for-electricians', label: 'Elec-Mate Customer Management' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "Reviews are the single most influential factor in a homeowner's decision to hire a tradesperson. BrightLocal research shows that 87 per cent of consumers read online reviews for local businesses, and 79 per cent trust them as much as personal recommendations.",
  'Google reviews are the highest priority — they directly influence your local map pack ranking, your Google Ads Quality Score, and your Local Services Ads position. Target Google before any other platform.',
  'The best time to ask for a review is immediately after completing the job, while the customer is satisfied and grateful. Conversion rates drop significantly after 24 hours.',
  'A brief, personalised WhatsApp or SMS message with your Google review link, sent within an hour of finishing the job, is the most effective review generation method for most electricians.',
  'Responding professionally to every negative review — calmly, factually, and with an offer to resolve — often matters more than the negative review itself. Prospective customers judge you by how you handle complaints, not just by your rating.',
  'Twenty genuine Google reviews with a 4.8+ average rating will noticeably improve your local map pack ranking and increase conversion rates from all other marketing channels.',
];

const faqs = [
  {
    question: 'How do I ask a customer for a Google review without feeling pushy?',
    answer:
      'The key is timing and framing. Ask immediately after completing the job — "I\'m really glad you\'re happy with the work. If you have a spare two minutes, a Google review would genuinely help my business. Would you be happy to leave one?" Then send the link via WhatsApp or SMS while you are still at the property or within the next hour. Frame it as a favour to a small business, not a transaction. Most satisfied customers are happy to help when asked directly and personally at the right moment. Sending a generic automated email a week later converts poorly by comparison.',
  },
  {
    question: 'How many reviews do I need to see a noticeable effect on my Google ranking?',
    answer:
      'The first 10–15 genuine reviews will typically produce a measurable improvement in your local map pack ranking in less competitive areas. In more competitive markets, you need 30–50 reviews to stand out. Beyond ranking, the trust impact on prospective customers is significant even at low numbers — a business with 8 reviews averaging 4.9 stars will convert better than a competitor with no reviews, regardless of ranking. Aim for 20+ reviews as your first milestone, then maintain a consistent rate of new reviews as the business grows.',
  },
  {
    question: 'Should I pay for reviews or use review generation services?',
    answer:
      "Never pay for fake reviews, incentivise customers in exchange for positive reviews, or use services that generate inauthentic reviews. This violates Google's terms of service and can result in your Business Profile being suspended — removing all your legitimate reviews along with the fake ones. It also violates the UK's Consumer Protection from Unfair Trading Regulations 2008. The risk is completely disproportionate to any short-term benefit. Legitimate review generation tools (which automate the request process for real customers) are fine — the line is asking real customers to share their genuine experience.",
  },
  {
    question:
      'What is the best platform for electrician reviews — Google, Checkatrade, or Trustpilot?',
    answer:
      'Google is the clear priority for most electricians — reviews directly improve your local ranking and are visible to anyone searching for you without needing to visit another site. Checkatrade is second priority if you have a paid listing — their reviews are trusted by homeowners and can be a key differentiator when customers compare multiple quotes. Trustpilot is more relevant for larger businesses with significant online transaction volume. For most electricians, focus 80 per cent of review generation efforts on Google and 20 per cent on your primary trade platform.',
  },
  {
    question: 'What do I do when I receive a negative review?',
    answer:
      'Respond within 24–48 hours, calmly and professionally. Thank the customer for their feedback, acknowledge the issue (even if you dispute the detail), and offer to resolve it offline: "Please call me directly on [number] so I can understand what happened and make it right." Never argue, attack, or be defensive in a public response — prospective customers read your responses and judge your character by them. A business that handles complaints graciously often converts better than one with a perfect 5.0 average and no negative reviews, because it looks more authentic.',
  },
  {
    question: 'Can I use a QR code to get more reviews?',
    answer:
      'Yes — QR code review cards are effective for customers who prefer to act in their own time rather than immediately after a job. Generate your Google review QR code from your Google Business Profile (or use a free QR code generator linking to your review URL). Print cards (Vistaprint, from £20 for 50 cards) with a clear message: "Loved our work? A quick Google review means everything to a small business — scan here." Leave one with every customer alongside your invoice or certificate. Some electricians report a 10–15 per cent additional review rate from cards alone.',
  },
  {
    question: 'How do I get a Google review link to send customers?',
    answer:
      'Log in to your Google Business Profile at business.google.com. In the left menu, find "Get more reviews" or use the Home tab which often shows a "Share review form" link. Click it to get a short URL that takes customers directly to the review prompt. Save this link in your phone contacts or in a WhatsApp template message so you can send it immediately after every job. Test the link on your own phone first — confirm it opens correctly and prompts for a review.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/seo-for-electricians',
    title: 'SEO for Electricians',
    description:
      'How reviews feed your Google ranking — and everything else you need to rank locally.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/electrician-business-website',
    title: 'Electrician Website Guide',
    description: 'Displaying your reviews on your website to maximise conversion.',
    icon: Globe,
    category: 'Guide',
  },
  {
    href: '/google-ads-electricians',
    title: 'Google Ads for Electricians',
    description: 'How your review score affects your Google Ads and Local Services Ads ranking.',
    icon: BarChart3,
    category: 'Guide',
  },
  {
    href: '/electrician-referral-programme',
    title: 'Electrician Referral Programme',
    description: 'Building a referral network — the natural complement to a review strategy.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/growing-electrical-business',
    title: 'Growing Your Electrical Business',
    description: 'From sole trader to small team — systems, hiring, and scaling.',
    icon: TrendingUp,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-reviews-matter',
    heading: 'Why Reviews Matter for Electricians — Trust, SEO, and Conversion',
    content: (
      <>
        <p>
          Electrical work involves entering someone's home and carrying out safety-critical work.
          Homeowners are understandably cautious about who they invite in. Reviews provide the
          social proof that overcomes that caution — they are the equivalent of a personal
          recommendation at scale.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Google ranking</strong> — review count, recency, and rating are direct
                ranking signals for the local map pack. An electrician with 40 reviews will
                typically rank above a competitor with 5 reviews, all else being equal. This effect
                compounds: more reviews → higher ranking → more visibility → more customers → more
                reviews.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conversion rate</strong> — a customer who finds you on Google and sees 45
                reviews averaging 4.9 stars is significantly more likely to contact you than to
                scroll down to a competitor with no reviews. Reviews reduce the risk perception of
                hiring an unknown tradesperson.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pricing power</strong> — electricians with strong reviews can charge more.
                Customers who are confident in the quality of your work before you arrive are less
                likely to question your quote or ask for a discount. A 4.9-star electrician with 50
                reviews competes less on price than one with no online presence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Referral amplification</strong> — when a referred customer Googles you (they
                always do), reviews confirm the referral. Without them, even a personal
                recommendation may not be enough to secure the booking.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Twenty genuine Google reviews with a 4.8+ average is the threshold at which most
          electricians report a noticeable improvement in enquiry quality and conversion rate. Make
          this your first marketing milestone.
        </p>
      </>
    ),
  },
  {
    id: 'when-and-how-to-ask',
    heading: 'When and How to Ask for a Review',
    content: (
      <>
        <p>
          Timing is everything. The moment immediately after completing a job — when the customer is
          relieved the problem is solved, impressed by the work, and grateful — is when your review
          conversion rate is highest. This window closes quickly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask in person first</strong> — when the customer expresses satisfaction
                (which most do), use that moment: "I'm really glad that's sorted. If you have a
                couple of minutes later, a Google review would genuinely help my business — I'll
                send you the link now." This verbal ask, followed immediately by the link, is the
                highest-converting combination.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Send the link within one hour</strong> — WhatsApp is the most effective
                channel for electricians. Compose a short, personal message: "Hi [name], thanks for
                having me today. Here's that Google review link if you get a chance — [link]. Really
                appreciate it." Personal messages convert significantly better than generic
                automated requests.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One follow-up only</strong> — if you do not receive a review within a week,
                one gentle reminder is acceptable: "I hope everything is working well. If you have a
                spare moment, your Google review would be much appreciated." Never send more than
                two requests — it damages the relationship.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Include the link in your invoice</strong> — add a line to your invoice
                template: "Enjoyed our service? A Google review means the world to us: [link]."
                Customers reading the invoice are often in a positive frame of mind having received
                the completed work certificate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'google-vs-platforms',
    heading: 'Google vs Checkatrade vs Trustpilot — Where to Focus',
    content: (
      <>
        <p>
          Different review platforms serve different purposes. Understanding where to focus your
          review generation efforts will maximise the return on the time you invest.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">
                  Google Reviews — primary priority (80% of your effort)
                </strong>
                <span>
                  Directly improve your local map pack ranking, visible on your Business Profile
                  without the customer needing to visit another site, and displayed when customers
                  Google your business name. Generate your review link from your Business Profile
                  dashboard and store it in your phone for instant sending.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">
                  Checkatrade — secondary priority (if you have a paid listing)
                </strong>
                <span>
                  Checkatrade reviews are trusted by homeowners and shown prominently on your
                  listing. A strong Checkatrade review score is a key differentiator when customers
                  compare multiple quotes. If you pay for Checkatrade, ask every customer to review
                  you there as well as on Google.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Trustpilot — useful for larger operations</strong>
                <span>
                  More relevant for electrical businesses with a significant online presence or
                  commercial customer base. Trustpilot reviews appear in Google results for branded
                  searches and carry trust authority. Lower priority than Google and Checkatrade for
                  most sole traders and small teams.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">
                  MyBuilder and Rated People — platform-specific
                </strong>
                <span>
                  Reviews on pay-per-lead platforms only appear within those platforms. They do not
                  improve your Google ranking directly. Focus on them only if a significant
                  proportion of your work comes through those platforms.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'negative-reviews',
    heading: 'Dealing With Negative Reviews Professionally',
    content: (
      <>
        <p>
          Negative reviews are inevitable. How you respond to them defines your reputation as much
          as the reviews themselves. Prospective customers reading your reviews pay close attention
          to how businesses handle complaints.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Respond within 24–48 hours</strong> — a prompt response signals that you
                take customer concerns seriously. Leaving a negative review unresponded for weeks
                suggests you either did not see it or do not care.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Acknowledge, do not argue</strong> — even if the review is unfair or
                factually incorrect, do not argue publicly. Acknowledge the customer's concern,
                thank them for the feedback, and invite them to discuss it privately: "I'm sorry to
                hear you weren't fully satisfied. Please call me on [number] so I can understand
                what happened and make it right."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not include customer information</strong> — never reference specific job
                details, dates, or pricing in your public response. If the situation was
                complicated, acknowledge that offline resolution is appropriate: "There are aspects
                of this situation I cannot discuss in a public forum, but I would welcome the chance
                to speak with you directly."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flag fraudulent reviews</strong> — if you believe a review is from someone
                who was not your customer (a competitor, a malicious actor), flag it for removal
                through Google Business Profile. Provide any evidence you have that the reviewer was
                not a genuine customer. Google does remove reviews that violate their policies,
                though the process can take weeks.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A business with one negative review handled graciously — and 40 positive responses to
          others — will convert better than a business with an unachievable 5.0 average and terse or
          defensive responses to any criticism. Authenticity and professionalism matter more than a
          perfect score.
        </p>
      </>
    ),
  },
  {
    id: 'qr-code-cards',
    heading: 'QR Code Follow-Up Cards',
    content: (
      <>
        <p>
          Printed QR code cards are a cost-effective supplement to your WhatsApp review requests.
          They capture the customers who prefer to act in their own time, and they serve double duty
          as a professional leave-behind that reminds customers of your business name.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Create your QR code</strong> — generate a QR code from your Google Business
                Profile review link using QR Code Generator (qr-code-generator.com, free) or
                similar. Test it on multiple devices to confirm it links directly to the review
                prompt, not just to your profile.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Card design essentials</strong> — your business name and logo, the QR code,
                a brief message ("Scan to leave us a Google review — it takes under two minutes and
                means the world to a small business"), and your contact details. Keep it simple.
                Vistaprint, Moo, or Canva Print produce professional cards from £20–£35 for 50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>When to leave the card</strong> — with every invoice or certificate, pinned
                to the fuseboard door after a consumer unit upgrade, left on the kitchen counter
                after a kitchen circuit job. Some electricians leave a card with every customer
                regardless of job size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Platform diversification on cards</strong> — if you want reviews on both
                Google and Checkatrade, print two QR codes side by side with clear labels. Some
                electricians print two card designs and alternate them. Keep it simple — one
                platform per card converts better than a card asking for reviews on five platforms.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'automating-review-requests',
    heading: 'Automating Review Requests Without Losing the Personal Touch',
    content: (
      <>
        <p>
          As your volume of jobs grows, manually sending review requests after every job becomes
          time-consuming. Automation can help, but must be implemented carefully — generic automated
          messages convert poorly compared to personalised ones.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>WhatsApp templates</strong> — save a review request message template in your
                phone so you can personalise and send it in under 30 seconds after each job. Semi-
                automated (template plus manual send) converts better than fully automated, because
                you can personalise the opening line with the customer's name and a specific
                reference to the job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Job management software triggers</strong> — some CRM and job management
                systems can automatically send a review request email or SMS when a job is marked
                complete. This works well for high-volume operations but requires your job records
                to include accurate customer contact details and job completion status.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Invoice-triggered requests</strong> — some invoicing platforms (including
                Elec-Mate) allow you to include a review link in the invoice footer. When the
                customer receives and reads their invoice, they see the review prompt in context of
                the completed, paid-for work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'How Elec-Mate Supports Your Customer Relationships',
    content: (
      <>
        <p>
          Professional customer management — sending invoices promptly, issuing certificates on
          site, communicating clearly — directly drives positive reviews. Customers who experience a
          polished, professional service are more likely to leave a five-star review and refer you
          to others.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Invoices That Impress</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send branded, itemised invoices from your phone within minutes of completing a
                  job. A professional invoice — not a handwritten receipt or a basic text message —
                  signals that you run a serious, organised business. Customers who receive
                  professional invoices are more likely to leave professional reviews. Include your
                  review link in the footer automatically.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Customer History at Your Fingertips</h4>
                <p className="text-white text-sm leading-relaxed">
                  Store customer records, job notes, and certificate history in Elec-Mate. When a
                  customer calls back with a question or wants additional work, you can pull up
                  their full history instantly — impressing them with your organisation and building
                  the kind of long-term relationship that generates both repeat business and
                  reviews.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional customer management that generates five-star reviews"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, invoicing, job management, and certification. The professional experience your customers will review. 7-day free trial."
          icon={Star}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CustomerReviewsElectricianPage() {
  return (
    <GuideTemplate
      title="Getting Customer Reviews as an Electrician UK | Review Strategy"
      description="How to get more Google, Checkatrade, and Trustpilot reviews as a UK electrician. When and how to ask, dealing with negative reviews, QR code cards, and how reviews improve your Google ranking and conversion rate."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Star}
      heroTitle={
        <>
          Getting Customer Reviews as an Electrician:{' '}
          <span className="text-yellow-400">UK Review Strategy</span>
        </>
      }
      heroSubtitle="A practical guide to generating five-star reviews as a UK electrician — why reviews matter for SEO and conversion, when and how to ask, Google vs Checkatrade vs Trustpilot, dealing with negative reviews professionally, and QR code follow-up cards."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Customer Reviews"
      relatedPages={relatedPages}
      ctaHeading="Run a Professional Business That Earns Five-Star Reviews"
      ctaSubheading="Elec-Mate helps UK electricians impress customers with professional quotes, invoices, and on-site certificates — generating the reviews that grow your business. 7-day free trial."
    />
  );
}
