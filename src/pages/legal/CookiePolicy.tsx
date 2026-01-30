import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ArrowLeft, Cookie, Shield, Settings, Globe, Clock, Trash2, Mail, Scale, AlertTriangle, ToggleRight, Database, RefreshCw } from "lucide-react";

const CookiePolicy = () => {
  const lastUpdated = "30 January 2026";
  const effectiveDate = "30 January 2026";

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full px-4 py-3 sm:py-4 border-b border-white/10 bg-black/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group touch-manipulation">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-yellow-400 flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
            </div>
            <span className="text-lg sm:text-xl font-bold">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </Link>
          <Link to="/settings">
            <Button variant="outline" size="sm" className="h-9 px-3 border-white/20 text-white hover:bg-white/5 touch-manipulation active:scale-95">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center">
            <Cookie className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Cookie Policy</h1>
            <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <Card className="bg-neutral-900 border-white/10 mb-6">
          <CardContent className="p-4 sm:p-6">
            <p className="text-gray-300 leading-relaxed">
              This Cookie Policy explains how Elec-Mate Ltd ("we", "us", "our") uses cookies and similar tracking technologies when you visit our platform. We are committed to full compliance with the Privacy and Electronic Communications Regulations 2003 (PECR) and the UK General Data Protection Regulation (UK GDPR).
            </p>
            <p className="text-gray-400 text-sm mt-3">
              <strong className="text-white">Effective Date:</strong> {effectiveDate}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* 1. Data Controller */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              1. Data Controller
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              The data controller responsible for cookies on this platform is:
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-medium">Elec-Mate Ltd</p>
              <p className="text-gray-400 text-sm mt-2">
                Email: <a href="mailto:info@elec-mate.com" className="text-yellow-400 hover:underline">info@elec-mate.com</a>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                ICO Registration Number: <span className="text-white">ZB935897</span>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Verify at{' '}
                <a
                  href="https://ico.org.uk/ESDWebPages/Entry/ZB935897"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline"
                >
                  ico.org.uk
                </a>
              </p>
            </div>
          </section>

          {/* 2. What Are Cookies */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              2. What Are Cookies?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Cookies are small text files stored on your device (computer, tablet, or mobile phone) when you visit websites. They serve various purposes:
            </p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside mb-4">
              <li>Remembering your login status and preferences</li>
              <li>Understanding how you use our platform</li>
              <li>Improving security and preventing fraud</li>
              <li>Providing personalised experiences</li>
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-sm">Session Cookies</h3>
                <p className="text-gray-400 text-xs">Temporary cookies deleted when you close your browser. Used for essential functions like keeping you logged in during a visit.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-sm">Persistent Cookies</h3>
                <p className="text-gray-400 text-xs">Remain on your device for a set period or until manually deleted. Used to remember preferences and track usage over time.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-sm">First-Party Cookies</h3>
                <p className="text-gray-400 text-xs">Set by Elec-Mate directly. We have full control over these and use them for core functionality.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-sm">Third-Party Cookies</h3>
                <p className="text-gray-400 text-xs">Set by our service providers (Supabase, Stripe, PostHog). We disclose these in this policy.</p>
              </div>
            </div>
          </section>

          {/* 3. Legal Basis */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Scale className="h-5 w-5" />
              3. Legal Basis for Using Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Under PECR and UK GDPR, different cookies require different legal bases:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Cookie Type</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Legal Basis</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Consent Required?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-white font-medium">Strictly Necessary</td>
                    <td className="py-3 px-4 text-gray-400">PECR Regulation 6(4) exemption</td>
                    <td className="py-3 px-4 text-green-400">No</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-white font-medium">Analytics</td>
                    <td className="py-3 px-4 text-gray-400">Consent (PECR Regulation 6)</td>
                    <td className="py-3 px-4 text-amber-400">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white font-medium">Marketing</td>
                    <td className="py-3 px-4 text-gray-400">Consent (PECR Regulation 6)</td>
                    <td className="py-3 px-4 text-amber-400">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Strictly Necessary Cookies */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              4. Strictly Necessary Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              These cookies are essential for the platform to function. They cannot be disabled as the service would not work without them. We do not require your consent for these cookies under PECR Regulation 6(4).
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-3 text-gray-300 font-medium">Cookie Name</th>
                    <th className="text-left py-3 px-3 text-gray-300 font-medium">Purpose</th>
                    <th className="text-left py-3 px-3 text-gray-300 font-medium">Provider</th>
                    <th className="text-left py-3 px-3 text-gray-300 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3 font-mono text-xs">sb-*-auth-token</td>
                    <td className="py-2 px-3 text-xs">Authentication session token</td>
                    <td className="py-2 px-3 text-xs">Supabase</td>
                    <td className="py-2 px-3 text-xs">7 days</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3 font-mono text-xs">sb-*-auth-token-code-verifier</td>
                    <td className="py-2 px-3 text-xs">PKCE authentication security</td>
                    <td className="py-2 px-3 text-xs">Supabase</td>
                    <td className="py-2 px-3 text-xs">Session</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3 font-mono text-xs">elec-mate-cookie-consent</td>
                    <td className="py-2 px-3 text-xs">Records your cookie consent choice</td>
                    <td className="py-2 px-3 text-xs">Elec-Mate</td>
                    <td className="py-2 px-3 text-xs">1 year</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3 font-mono text-xs">elec-mate-cookie-preferences</td>
                    <td className="py-2 px-3 text-xs">Stores your cookie preference settings</td>
                    <td className="py-2 px-3 text-xs">Elec-Mate</td>
                    <td className="py-2 px-3 text-xs">1 year</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">__stripe_mid, __stripe_sid</td>
                    <td className="py-2 px-3 text-xs">Payment fraud prevention</td>
                    <td className="py-2 px-3 text-xs">Stripe</td>
                    <td className="py-2 px-3 text-xs">1 year / Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-blue-200 text-sm">
                  <strong>Note:</strong> Blocking essential cookies via your browser will prevent you from logging in or using core features of Elec-Mate.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Analytics Cookies */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Database className="h-5 w-5" />
              5. Analytics Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              With your consent, we use analytics cookies to understand how visitors interact with our platform. This data helps us improve our services. <strong className="text-white">These cookies are only set if you accept analytics in our cookie banner.</strong>
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-3 text-gray-300 font-medium">Cookie Name</th>
                    <th className="text-left py-3 px-3 text-gray-300 font-medium">Purpose</th>
                    <th className="text-left py-3 px-3 text-gray-300 font-medium">Provider</th>
                    <th className="text-left py-3 px-3 text-gray-300 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3 font-mono text-xs">ph_*</td>
                    <td className="py-2 px-3 text-xs">User behaviour analytics, feature usage</td>
                    <td className="py-2 px-3 text-xs">PostHog</td>
                    <td className="py-2 px-3 text-xs">1 year</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">_vercel_insights_*</td>
                    <td className="py-2 px-3 text-xs">Page performance monitoring</td>
                    <td className="py-2 px-3 text-xs">Vercel</td>
                    <td className="py-2 px-3 text-xs">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">What We Track</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Pages visited and time spent on each page</li>
                  <li>Features used and buttons clicked</li>
                  <li>Device type, browser, and operating system</li>
                  <li>Approximate location (country/region only)</li>
                  <li>How you arrived at our platform (referral source)</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">What We Do NOT Track</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Personal form data or content you create</li>
                  <li>Passwords or payment information</li>
                  <li>Precise location or IP address storage</li>
                  <li>Activity on other websites</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Marketing Cookies */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <ToggleRight className="h-5 w-5" />
              6. Marketing Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Marketing cookies may be used to track visitors across websites and display relevant advertisements. <strong className="text-white">We currently do not use marketing or advertising cookies.</strong> If this changes, we will update this policy and request your consent.
            </p>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
              <p className="text-green-200 text-sm">
                <strong>Current Status:</strong> No marketing or advertising cookies are in use on Elec-Mate.
              </p>
            </div>
          </section>

          {/* 7. Third-Party Cookies */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              7. Third-Party Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Some of our service providers may set cookies on your device. We have carefully selected providers who comply with data protection regulations:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Supabase (Authentication & Database)</h3>
                <p className="text-gray-300 text-sm mb-2">Provides secure authentication and data storage. Sets essential cookies for login sessions.</p>
                <p className="text-gray-400 text-xs">
                  Location: EU (Frankfurt) |{' '}
                  <a href="https://supabase.com/privacy" className="text-yellow-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Stripe (Payment Processing)</h3>
                <p className="text-gray-300 text-sm mb-2">Processes payments securely. Sets cookies for fraud prevention and payment session management.</p>
                <p className="text-gray-400 text-xs">
                  Location: EU/USA (SCCs in place) |{' '}
                  <a href="https://stripe.com/gb/privacy" className="text-yellow-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">PostHog (Analytics)</h3>
                <p className="text-gray-300 text-sm mb-2">Only loaded if you consent to analytics cookies. Helps us understand platform usage.</p>
                <p className="text-gray-400 text-xs">
                  Location: EU |{' '}
                  <a href="https://posthog.com/privacy" className="text-yellow-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Vercel (Hosting & Performance)</h3>
                <p className="text-gray-300 text-sm mb-2">Hosts our platform and provides performance insights. Minimal, privacy-focused analytics.</p>
                <p className="text-gray-400 text-xs">
                  Location: EU (Ireland) |{' '}
                  <a href="https://vercel.com/legal/privacy-policy" className="text-yellow-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* 8. How We Obtain Consent */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              8. How We Obtain & Manage Your Consent
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We are committed to obtaining clear, informed consent before setting any non-essential cookies:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Cookie Consent Banner</h3>
                <p className="text-gray-300 text-sm">When you first visit Elec-Mate, you'll see a cookie banner at the bottom of the screen. You can:</p>
                <ul className="text-gray-300 text-sm mt-2 space-y-1 list-disc list-inside">
                  <li><strong className="text-white">Accept All:</strong> Enables all cookies including analytics</li>
                  <li><strong className="text-white">Essential Only:</strong> Enables only strictly necessary cookies</li>
                  <li><strong className="text-white">Manage Preferences:</strong> Customise which cookie categories you accept</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Changing Your Preferences</h3>
                <p className="text-gray-300 text-sm">You can change your cookie preferences at any time:</p>
                <ul className="text-gray-300 text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Go to <strong className="text-white">Settings → Privacy</strong> in your account</li>
                  <li>Adjust the cookie toggles under "Cookie Preferences"</li>
                  <li>Your new preferences take effect immediately</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">How We Respect Your Choice</h3>
                <p className="text-gray-300 text-sm">When you decline analytics cookies:</p>
                <ul className="text-gray-300 text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Analytics scripts are <strong className="text-white">not loaded at all</strong> (not just disabled)</li>
                  <li>No tracking data is collected or sent to PostHog</li>
                  <li>Your preference is stored locally and respected across sessions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 9. Cookie Retention */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              9. Cookie Retention Periods
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Cookie Category</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-gray-300">Session cookies</td>
                    <td className="py-3 px-4 text-gray-400">Deleted when you close your browser</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-gray-300">Authentication cookies</td>
                    <td className="py-3 px-4 text-gray-400">7 days maximum</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-gray-300">Consent preferences</td>
                    <td className="py-3 px-4 text-gray-400">1 year (then we ask again)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-gray-300">Analytics cookies</td>
                    <td className="py-3 px-4 text-gray-400">Up to 1 year (PostHog)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Stripe fraud prevention</td>
                    <td className="py-3 px-4 text-gray-400">1 year maximum</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 10. Browser Controls */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              10. Managing Cookies via Your Browser
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              In addition to our consent controls, you can manage cookies through your browser settings:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Viewing & Deleting Cookies</h3>
                <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                  <li><strong className="text-white">Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong className="text-white">Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                  <li><strong className="text-white">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong className="text-white">Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-200 text-sm font-medium">Warning</p>
                    <p className="text-amber-200/80 text-xs mt-1">
                      Blocking all cookies via your browser will prevent Elec-Mate from functioning correctly. You won't be able to log in or access your account. We recommend using our cookie banner to selectively control non-essential cookies instead.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 11. Similar Technologies */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">11. Similar Technologies</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              In addition to cookies, we may use similar technologies:
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Local Storage</h3>
                <p className="text-gray-300 text-sm">Used to store your preferences and app state locally on your device. This includes your cookie consent choice and UI preferences.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Session Storage</h3>
                <p className="text-gray-300 text-sm">Temporary storage cleared when you close your browser tab. Used for form data and navigation state.</p>
              </div>
            </div>
          </section>

          {/* 12. Your Rights */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Scale className="h-5 w-5" />
              12. Your Rights
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Under UK GDPR and PECR, you have the following rights regarding cookies:
            </p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li><strong className="text-white">Right to be informed:</strong> This policy explains what cookies we use and why</li>
              <li><strong className="text-white">Right to consent:</strong> We ask before setting non-essential cookies</li>
              <li><strong className="text-white">Right to withdraw consent:</strong> Change preferences anytime via Settings → Privacy</li>
              <li><strong className="text-white">Right to access:</strong> Request details of data collected via cookies</li>
              <li><strong className="text-white">Right to erasure:</strong> Delete cookies via browser or request data deletion</li>
            </ul>
            <p className="text-gray-400 text-sm mt-3">
              To exercise these rights, contact us at <a href="mailto:info@elec-mate.com" className="text-yellow-400 hover:underline">info@elec-mate.com</a>.
            </p>
          </section>

          {/* 13. Updates */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              13. Updates to This Policy
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              We may update this Cookie Policy to reflect changes in our practices, technology, or legal requirements. When we make material changes:
            </p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li>We will update the "Last updated" date at the top of this policy</li>
              <li>For significant changes, we will reset your cookie preferences and ask for consent again</li>
              <li>We may notify you via email or in-app notification for major updates</li>
            </ul>
          </section>

          {/* 14. Complaints */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">14. Complaints</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              If you have concerns about our use of cookies, please contact us first. If you're not satisfied with our response, you can complain to:
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-medium">Information Commissioner's Office (ICO)</p>
              <p className="text-gray-400 text-sm mt-2">
                Website:{' '}
                <a
                  href="https://ico.org.uk/make-a-complaint/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline"
                >
                  ico.org.uk/make-a-complaint
                </a>
              </p>
              <p className="text-gray-400 text-sm">Helpline: 0303 123 1113</p>
            </div>
          </section>

          {/* 15. Contact */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              15. Contact Us
            </h2>
            <p className="text-gray-300 mb-4">
              For questions about this Cookie Policy or to exercise your rights:
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-medium">Elec-Mate Ltd</p>
              <p className="text-gray-400 text-sm mt-2">
                Email: <a href="mailto:info@elec-mate.com" className="text-yellow-400 hover:underline">info@elec-mate.com</a>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                ICO Registration: ZB935897
              </p>
            </div>
          </section>
        </div>

        {/* Back button */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <Link to="/settings">
            <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Settings
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CookiePolicy;
