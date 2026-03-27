import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  Star,
  Camera,
  Search,
  MessageSquare,
  Briefcase,
  FileCheck2,
  TrendingUp,
  Users,
  PoundSterling,
  CheckCircle,
  AlertTriangle,
  Globe,
  Phone,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Google Business Profile', href: '/guides/google-my-business-electrician' },
];

const tocItems = [
  { id: 'overview', label: 'Why Google Business Profile Matters' },
  { id: 'setup', label: 'Step-by-Step Setup' },
  { id: 'verification', label: 'Verification Process' },
  { id: 'categories', label: 'Optimal Categories' },
  { id: 'photos', label: 'Photo Strategy' },
  { id: 'reviews', label: 'Review Generation Strategy' },
  { id: 'posts-and-qa', label: 'Google Posts and Q&A' },
  { id: 'service-area', label: 'Service Area Setup' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Google Business Profile (formerly Google My Business) is the single most important free marketing tool for local electricians. It controls how you appear in Google Maps, local search results, and the "Local Pack" — the map and 3 business listings at the top of search results.',
  'The optimal primary category is "Electrician." Add secondary categories: "Electrical Installation Service," "Electrical Repair Service," and "EV Charging Station Installation Service" if relevant.',
  'Businesses with 40+ photos get 35% more clicks to their website and 42% more direction requests than businesses without photos. Upload photos of your van, completed work, your team, and your certificates.',
  'Reviews are the most important ranking factor for the Local Pack. Ask every satisfied customer for a Google review — create a short link and send it by text or WhatsApp immediately after completing the job.',
  'Set your service area by postcode districts or radius (up to 100km). Do NOT add a physical address if you do not have a customer-facing premises — Google may flag your listing for violating guidelines.',
];

const faqs = [
  {
    question: 'Is Google Business Profile free?',
    answer:
      'Yes — Google Business Profile is completely free to create and manage. There are no setup fees, no monthly fees, and no charges for appearing in Google Maps or local search results. Google makes money from paid advertising (Google Ads), but the organic Business Profile listing is free. Some third-party companies offer to "manage" your Google Business Profile for a fee — in most cases, you do not need this. The platform is designed to be managed by business owners directly.',
  },
  {
    question: 'How long does verification take?',
    answer:
      'Verification methods and timelines vary. Video verification (the most common method for new listings in 2026) requires you to record a short video showing your business location, branded materials (van, uniform, business card), and the surrounding area — this is typically reviewed within 48 hours. Postcard verification sends a postcard with a PIN to your business address, taking 5 to 14 days. Phone verification (if available) is instant — Google calls or texts a PIN to your business phone number. During verification, your listing will not appear in search results.',
  },
  {
    question: 'Should I use my home address or a service area?',
    answer:
      'If you work from home and visit customers at their premises (which is the case for most electricians), you should set up a service area business — NOT display your home address. Google\'s guidelines state that you should only show an address if customers visit your location. Displaying your home address when customers do not visit it can result in your listing being suspended. Set your service area by entering the postcode districts, towns, or cities you cover. You can set a radius of up to 100km from your location.',
  },
  {
    question: 'What categories should an electrician choose?',
    answer:
      'Your primary category should be "Electrician" — this is the category that carries the most weight for ranking. Add relevant secondary categories: "Electrical Installation Service" (if you do new installations), "Electrical Repair Service" (if you do fault-finding and repairs), "EV Charging Station Installation Service" (if you install EV chargers), "Lighting Contractor" (if you specialise in lighting), and "Fire Alarm Supplier" (if you install fire alarms). Do not add categories that are not relevant to your work — this can dilute your ranking for your core services.',
  },
  {
    question: 'How do I get more Google reviews?',
    answer:
      'The most effective strategy is simple: ask every satisfied customer immediately after completing the job. Create a direct review link (in your Google Business Profile dashboard, go to "Ask for reviews" to get a short link). Send this link by text message or WhatsApp within an hour of completing the job — while the customer is still pleased with the work. You can say: "Thanks for choosing [your business name]. If you were happy with the work, a Google review would really help — here is the link: [link]." Do NOT offer incentives for reviews (this violates Google\'s policies). Do NOT buy fake reviews (Google detects and removes them, and may suspend your listing).',
  },
  {
    question: 'How do I respond to a negative review?',
    answer:
      'Respond to every negative review professionally and promptly — ideally within 24 hours. Keep your response calm, factual, and constructive. Acknowledge the customer\'s concern, apologise for any shortfall in their experience, and offer to resolve the issue offline ("Please call me on [number] so we can resolve this"). Never argue, insult the customer, or share confidential details about the job. Potential customers read your responses to negative reviews — they judge you on how you handle criticism. A thoughtful response to a 1-star review can be more powerful than the review itself. If a review is fake, defamatory, or violates Google\'s policies, you can flag it for removal.',
  },
  {
    question: 'What are Google Posts and should I use them?',
    answer:
      'Google Posts are short updates that appear on your Business Profile listing. You can post offers, events, updates, and new content — similar to social media posts but displayed directly in Google Search and Maps. For electricians, useful posts include: seasonal promotions ("Book your EICR before your tenant renewal date"), new service announcements ("Now offering EV charger installations"), completed project showcases (with photos), and educational tips ("Why your RCD keeps tripping"). Posts expire after 7 days but remain visible in your profile history. Posting once per week keeps your profile active and signals to Google that your business is current and engaged.',
  },
  {
    question: 'Does Google Business Profile help my website rank higher?',
    answer:
      'Indirectly, yes. A well-optimised Google Business Profile with consistent NAP (Name, Address, Phone) data, positive reviews, and a link to your website sends strong local relevance signals to Google. The Business Profile listing itself appears in the "Local Pack" (the map results), which is separate from the organic website results below — but both benefit from a strong profile. Make sure the business name, address (or service area), and phone number on your Business Profile exactly match those on your website. Add your website URL to your profile. Google uses consistency across platforms as a trust signal for local ranking.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description:
      'Starting your electrical business — registration, pricing, insurance, and finding customers.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/compare/checkatrade-vs-mybuilder-vs-bark',
    title: 'Checkatrade vs MyBuilder vs Bark',
    description:
      'Compare lead generation platforms — costs, lead quality, and the right choice for your business.',
    icon: TrendingUp,
    category: 'Comparison',
  },
  {
    href: '/guides/electrician-business-insurance',
    title: 'Business Insurance Guide',
    description:
      'Public liability and all the insurance you need to look professional and protect your business.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Send professional PDF quotes that convert enquiries into booked jobs.',
    icon: FileCheck2,
    category: 'Tool',
  },
  {
    href: '/guides/hiring-first-employee-electrician',
    title: 'Hiring Your First Employee',
    description:
      'Growing your business — when and how to take on your first apprentice or electrician.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete certificates on site — professional documentation your customers will review on Google.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Google Business Profile Is Essential for Electricians',
    content: (
      <>
        <p>
          When someone searches "electrician near me" or "electrician [your town]," Google shows a
          map with three local businesses (the "Local Pack") before any website results. If you are
          not in that Local Pack, you are invisible to the highest-intent customers in your area —
          people who need an electrician right now.
        </p>
        <p>
          Google Business Profile (GBP) is what controls your presence in Google Maps and the Local
          Pack. It is free. It takes 30 minutes to set up. And for most local electricians, it
          generates more enquiries than any paid advertising or lead generation platform.
        </p>
        <p>
          This guide walks you through setting up, verifying, and optimising your Google Business
          Profile to maximise your visibility and convert searchers into customers.
        </p>
      </>
    ),
  },
  {
    id: 'setup',
    heading: 'Step-by-Step Setup Guide',
    content: (
      <>
        <p>
          Setting up your Google Business Profile takes approximately 30 minutes. Here is the
          complete process.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1. Go to business.google.com</strong> and sign in with your Google account.
                Use a dedicated business Google account if you have one — this keeps your business
                profile separate from personal Google services.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2. Enter your business name</strong> exactly as you want it to appear in
                search results. Use your registered trading name — do not keyword-stuff (for example,
                "Smith Electrical — Electrician in Manchester" violates Google's guidelines and can
                get your listing suspended).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3. Choose your primary category:</strong> "Electrician." You can add
                secondary categories later.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4. Set your location type.</strong> If customers visit your premises (you
                have a shop or office), add your address. If you visit customers (most electricians),
                select "I deliver goods and services to my customers" and set a service area instead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5. Add your contact details:</strong> phone number (the one you answer for
                business calls) and website URL. If you do not have a website, leave it blank for
                now — do not link to a Facebook page.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6. Set your business hours.</strong> Be accurate — if you do not answer calls
                at 7am on Sunday, do not list Sunday as open. Customers who call outside your listed
                hours and get no answer will leave a negative impression.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>7. Write your business description.</strong> Up to 750 characters. Focus on
                what you do, where you work, and your qualifications. Include your competent person
                scheme membership, years of experience, and the types of work you specialise in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>8. Add your services.</strong> List every service you offer: consumer unit
                upgrades, rewires, fault-finding, EICR testing, EV charger installation, new builds,
                extensions, fire alarms, smart home wiring, PAT testing, etc.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'verification',
    heading: 'Verification Process',
    content: (
      <>
        <p>
          Google requires you to verify your business before your profile appears in search results.
          This proves you are a real business and prevents fraudulent listings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-3 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-400" /> Video Verification
              </h4>
              <ul className="space-y-2">
                <li>Most common in 2026</li>
                <li>Record a short video showing your business</li>
                <li>Show branded van, uniform, or signage</li>
                <li>Show surrounding area/street</li>
                <li>Review: <strong className="text-yellow-400">24–48 hours</strong></li>
              </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-400" /> Phone Verification
              </h4>
              <ul className="space-y-2">
                <li>Available for some businesses</li>
                <li>Google calls or texts a PIN</li>
                <li>Enter PIN in your profile</li>
                <li>Review: <strong className="text-yellow-400">Instant</strong></li>
                <li className="text-xs">Not always offered as an option</li>
              </ul>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400" /> Postcard Verification
              </h4>
              <ul className="space-y-2">
                <li>Google posts a PIN to your address</li>
                <li>Enter PIN in your profile</li>
                <li>Delivery: <strong className="text-yellow-400">5–14 days</strong></li>
                <li className="text-xs">Less common now but still used</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>Tip:</strong> For video verification, film your branded van (showing company name
          and phone number), your NICEIC/NAPIT card or certificate, and the front of your business
          premises or home office. Keep the video under 2 minutes. Google is looking for evidence
          that you are a legitimate, established business.
        </p>
      </>
    ),
  },
  {
    id: 'categories',
    heading: 'Optimal Categories for Electricians',
    content: (
      <>
        <p>
          Your primary category is the single most important ranking factor for Google Business
          Profile. Secondary categories add breadth. Choose carefully.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-3">Primary Category</h4>
              <p className="text-yellow-400 font-bold text-lg mb-2">Electrician</p>
              <p>This is the highest-volume search term and should always be your primary category.</p>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-3">Recommended Secondary Categories</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span>Electrical Installation Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span>Electrical Repair Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span>EV Charging Station Installation Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span>Lighting Contractor (if applicable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span>Fire Alarm Supplier (if applicable)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>Do not add irrelevant categories.</strong> Adding "Plumber" or "General Contractor"
          if you are not one dilutes your relevance for electrical searches and can result in your
          listing being flagged. Only add categories that genuinely describe services you provide.
        </p>
      </>
    ),
  },
  {
    id: 'photos',
    heading: 'Photo Strategy: What to Upload',
    content: (
      <>
        <p>
          Google's data shows that businesses with photos get significantly more engagement.
          Businesses with 40+ photos get 35% more clicks to their website and 42% more direction
          requests than those without photos.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Your Van (Branded)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Your branded van is your mobile advertisement. Photograph it from multiple angles,
                  ideally parked outside a completed job site. The company name, phone number, and
                  logo should be clearly visible. This establishes legitimacy and professionalism.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Completed Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before-and-after photos of consumer unit upgrades, rewires, new installations, EV
                  charger installations, lighting projects, and distribution boards. These showcase
                  your quality and help customers visualise the standard of work they will receive.
                  Aim to add 2-3 new project photos per month.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Your Team</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photos of you and your team in uniform or workwear. Customers want to see who is
                  coming to their home. A friendly, professional team photo builds trust before the
                  customer even calls.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certifications and Accreditations</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photos of your NICEIC/NAPIT registration card, qualifications, and any specialist
                  certifications (EV charging, fire alarm, solar PV). These serve as visual proof
                  of your credentials and distinguish you from unqualified competitors.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          <strong>Photo quality tips:</strong> Use good lighting (natural daylight is best), keep
          backgrounds clean and tidy, shoot landscape orientation for maximum impact, and avoid
          photos with customer details or personal information visible.
        </p>
      </>
    ),
  },
  {
    id: 'reviews',
    heading: 'Review Generation Strategy',
    content: (
      <>
        <p>
          Reviews are the most important factor for ranking in the Local Pack and for converting
          searchers into callers. Here is a proven strategy for generating consistent reviews.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Create a review link.</strong> In your Google Business Profile dashboard, go
                to "Ask for reviews" or "Share review form." Copy the short link. Save it in your
                phone's notes app for quick access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask immediately after the job.</strong> Send the link by text or WhatsApp
                within an hour of completing the job. The customer is most likely to leave a review
                while the experience is fresh and they are satisfied.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a template message.</strong> "Thanks for choosing [business name]. If
                you were happy with the work, a quick Google review would really help us. Here is
                the link: [link]. Thanks, [your name]." Keep it short and personal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Respond to every review.</strong> Thank customers who leave positive reviews.
                Respond professionally to negative reviews. Google sees response activity as an
                engagement signal, and potential customers see that you care.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Aim for consistency.</strong> 2-4 reviews per month is better than 20
                reviews in one week then nothing for 3 months. A steady stream of recent reviews
                signals an active, popular business.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" /> What NOT to Do
          </h4>
          <ul className="space-y-2 text-white text-sm">
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>Do NOT offer discounts or incentives for reviews (violates Google's policies)</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>Do NOT buy fake reviews (Google detects and removes them; may suspend your listing)</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>Do NOT ask friends or family who are not customers to leave reviews</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>Do NOT review-gate (only asking customers who had a positive experience)</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'posts-and-qa',
    heading: 'Google Posts and Q&A Section',
    content: (
      <>
        <p>
          Two underused features of Google Business Profile that can differentiate you from
          competitors.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" /> Google Posts
            </h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Short updates displayed on your profile. Post once per week to keep your listing
              active. Good post ideas:
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Completed project showcases (with photos)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Seasonal offers (EICR before tenant renewal, outdoor lighting for summer)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>New service announcements (EV charger installations, smart home wiring)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Educational tips (why your RCD trips, when to get an EICR)</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-400" /> Q&A Section
            </h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Anyone can ask a question on your profile. Seed it with common questions and answer
              them yourself:
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>"Do you provide free quotes?" — "Yes, all our quotes are free and..."</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>"Are you NICEIC registered?" — "Yes, we are NICEIC Approved..."</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>"What areas do you cover?" — "We cover [areas]..."</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>"Do you do emergency call-outs?" — "Yes, we offer same-day..."</span>
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'service-area',
    heading: 'Service Area Setup',
    content: (
      <>
        <p>
          Your service area tells Google where to show your listing in local searches. Get this right
          and you appear for the right searches in the right locations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Service area businesses (no shopfront):</strong> Set your coverage by
                entering the towns, cities, or postcode districts you serve. You can add up to 20
                areas. Be specific — "Manchester" is better than "North West England" for ranking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Be realistic.</strong> Only include areas you actually travel to for work.
                If you are based in Bristol and rarely work in Bath, do not add Bath — it dilutes
                your ranking in Bristol where most of your customers are.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do NOT display a home address.</strong> If customers do not visit your home,
                do not show your home address. Use "Service area" only. Displaying an address that
                customers do not visit violates Google's guidelines and can result in suspension.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Update seasonally.</strong> If you take on work further afield in quieter
                months, you can adjust your service area. Google allows you to change it at any time.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes That Hurt Your Listing',
    content: (
      <>
        <p>
          Avoid these mistakes that can reduce your visibility, get your listing flagged, or
          undermine customer trust.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keyword-stuffing your business name.</strong> Your business name must be
                your real business name — not "Smith Electrical — Best Electrician in Manchester
                — Emergency Electrician." Google will suspend listings that add keywords to the
                business name.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inconsistent NAP data.</strong> Your Name, Address, and Phone number must
                be identical across your Google Business Profile, website, social media, and
                directory listings. "Smith Electrical" on Google and "Smith Electrical Ltd" on your
                website is an inconsistency that can reduce ranking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not responding to reviews.</strong> Ignoring reviews (especially negative
                ones) signals disengagement. Respond to every review — positive and negative — within
                48 hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No photos.</strong> A listing with no photos looks abandoned or
                untrustworthy. Upload at least 10 photos when you create your profile and add new
                photos regularly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorrect business hours.</strong> If a customer calls during your listed
                hours and gets no answer, they will go to your competitor. Set accurate hours and
                update them for bank holidays.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Neglecting the listing after setup.</strong> An active profile ranks better
                than a stale one. Post updates, add photos, respond to reviews, and answer questions
                regularly. Treat it like a social media channel for your business.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Win more jobs from Google searches"
          description="Elec-Mate helps you send professional quotes fast, complete certificates on site, and manage your growing business. Convert Google enquiries into booked jobs. 7-day free trial."
          icon={Search}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GoogleMyBusinessElectricianPage() {
  return (
    <GuideTemplate
      title="Google Business Profile for Electricians | Setup Guide 2026"
      description="Complete guide to setting up and optimising Google Business Profile for electricians. Step-by-step setup, verification, categories, photo strategy, review generation, Google Posts, service area, and common mistakes."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Marketing Guide"
      badgeIcon={Search}
      heroTitle={
        <>
          Google Business Profile for Electricians:{' '}
          <span className="text-yellow-400">Get Found, Get Hired, Grow Your Business</span>
        </>
      }
      heroSubtitle="When someone searches 'electrician near me,' Google shows 3 local businesses on the map. If you are not one of them, you are invisible. This guide walks you through setting up, verifying, and optimising your Google Business Profile to dominate local search in your area."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Google Business Profile"
      relatedPages={relatedPages}
      ctaHeading="Convert Google Searches Into Booked Jobs"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting, certification, and job management. Send professional quotes in minutes and win more of the jobs that find you on Google. 7-day free trial, cancel anytime."
    />
  );
}
