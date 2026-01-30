import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ArrowLeft, Shield, Mail, Lock, Database, UserCheck, Trash2, Globe, Clock, Server, FileText, AlertTriangle, Scale, Users, RefreshCw } from "lucide-react";

const PrivacyPolicy = () => {
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
            <Shield className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Privacy Policy</h1>
            <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <Card className="bg-neutral-900 border-white/10 mb-6">
          <CardContent className="p-4 sm:p-6">
            <p className="text-gray-300 leading-relaxed">
              Elec-Mate Ltd ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use our platform, in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
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
              The data controller responsible for your personal data is:
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
                You can verify our registration at{' '}
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

          {/* 2. Data We Collect */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Database className="h-5 w-5" />
              2. Personal Data We Collect
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We collect personal data that you provide directly to us, data generated through your use of our services, and data from third-party sources.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Account & Identity Data</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Full name and email address</li>
                  <li>Username and password (securely hashed)</li>
                  <li>Profile photograph (optional)</li>
                  <li>Account role (apprentice, electrician, employer, college)</li>
                  <li>Phone number (optional)</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Professional & Qualification Data</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>ECS card type, number, and expiry date</li>
                  <li>Qualifications and certifications held</li>
                  <li>Training provider and course information</li>
                  <li>Employer details (company name, role)</li>
                  <li>Years of experience and specialisations</li>
                  <li>Elec-ID verification data</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Learning & Progress Data</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Course enrolments and completion status</li>
                  <li>Quiz scores and assessment results</li>
                  <li>Study time and module progress</li>
                  <li>Notes and bookmarks</li>
                  <li>CPD hours logged</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Business & Transaction Data</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Customer records you create (names, addresses, contact details)</li>
                  <li>Invoices and quotes generated</li>
                  <li>Subscription and payment history</li>
                  <li>Billing address and payment method (processed by Stripe)</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Technical & Usage Data</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>IP address and approximate location (country/region)</li>
                  <li>Browser type and version</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited and features used</li>
                  <li>Session duration and timestamps</li>
                  <li>Referral source</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. How We Use Your Data */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              3. How We Use Your Personal Data
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We process your personal data for the following purposes:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Service Delivery</h3>
                <p className="text-gray-300 text-sm">Providing access to study materials, tools, calculators, and professional features. Managing your account, subscriptions, and preferences.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Elec-ID Verification</h3>
                <p className="text-gray-300 text-sm">Creating and maintaining your digital professional credential, verifying qualifications, and enabling employers to confirm your credentials.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Progress Tracking</h3>
                <p className="text-gray-300 text-sm">Recording your learning progress, quiz results, and CPD activities. Generating certificates of completion.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Communication</h3>
                <p className="text-gray-300 text-sm">Sending service notifications, security alerts, subscription reminders, and (with your consent) marketing communications about new features.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Platform Improvement</h3>
                <p className="text-gray-300 text-sm">Analysing usage patterns to improve our services, fix bugs, and develop new features. All analytics data is aggregated and anonymised where possible.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Legal & Security</h3>
                <p className="text-gray-300 text-sm">Preventing fraud, enforcing our terms, complying with legal obligations, and protecting the rights and safety of our users.</p>
              </div>
            </div>
          </section>

          {/* 4. Legal Basis */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Scale className="h-5 w-5" />
              4. Legal Basis for Processing
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Under UK GDPR, we must have a lawful basis for processing your personal data. We rely on the following:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Legal Basis</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-white font-medium">Contract</td>
                    <td className="py-3 px-4 text-gray-400">Processing necessary to provide our services to you, manage your account, and fulfil your subscription.</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-white font-medium">Consent</td>
                    <td className="py-3 px-4 text-gray-400">Marketing communications, optional analytics cookies, and Elec-ID public profile visibility.</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-white font-medium">Legitimate Interests</td>
                    <td className="py-3 px-4 text-gray-400">Improving our services, preventing fraud, ensuring security, and understanding how users interact with our platform.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white font-medium">Legal Obligation</td>
                    <td className="py-3 px-4 text-gray-400">Complying with tax, accounting, and regulatory requirements. Responding to lawful requests from authorities.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Data Sharing */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Users className="h-5 w-5" />
              5. Who We Share Your Data With
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We do not sell your personal data. We share data only with the following categories of recipients:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Service Providers (Sub-Processors)</h3>
                <p className="text-gray-300 text-sm mb-3">We use carefully selected third-party providers to help deliver our services:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-3 text-gray-400 font-medium">Provider</th>
                        <th className="text-left py-2 px-3 text-gray-400 font-medium">Purpose</th>
                        <th className="text-left py-2 px-3 text-gray-400 font-medium">Location</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-3">Supabase</td>
                        <td className="py-2 px-3">Database & authentication</td>
                        <td className="py-2 px-3">EU (Frankfurt)</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-3">Stripe</td>
                        <td className="py-2 px-3">Payment processing</td>
                        <td className="py-2 px-3">EU/USA</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-3">Vercel</td>
                        <td className="py-2 px-3">Web hosting</td>
                        <td className="py-2 px-3">EU (Ireland)</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-3">PostHog</td>
                        <td className="py-2 px-3">Analytics (with consent)</td>
                        <td className="py-2 px-3">EU</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-3">OpenAI</td>
                        <td className="py-2 px-3">AI-powered features</td>
                        <td className="py-2 px-3">USA (DPA in place)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Resend</td>
                        <td className="py-2 px-3">Transactional emails</td>
                        <td className="py-2 px-3">USA (DPA in place)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Elec-ID Verification (With Your Consent)</h3>
                <p className="text-gray-300 text-sm">If you use Elec-ID and share your verification link, employers or clients can view your professional credentials. You control what information is visible on your public profile.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Legal Requirements</h3>
                <p className="text-gray-300 text-sm">We may disclose data when required by law, court order, or government request, or to protect our rights, safety, or property.</p>
              </div>
            </div>
          </section>

          {/* 6. International Transfers */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              6. International Data Transfers
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Some of our service providers are based outside the UK. When we transfer personal data internationally, we ensure appropriate safeguards are in place:
            </p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li><strong className="text-white">EU/EEA:</strong> Transfers covered by UK adequacy regulations</li>
              <li><strong className="text-white">USA:</strong> We use providers certified under the EU-US Data Privacy Framework or ensure International Data Transfer Agreements (IDTAs) and Standard Contractual Clauses (SCCs) are in place</li>
              <li><strong className="text-white">Other countries:</strong> Only with appropriate safeguards approved by the ICO</li>
            </ul>
          </section>

          {/* 7. Data Security */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              7. Data Security
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              We implement appropriate technical and organisational measures to protect your personal data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-sm">Encryption</h3>
                <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
                  <li>TLS 1.3 for data in transit</li>
                  <li>AES-256 encryption at rest</li>
                  <li>Bcrypt password hashing</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-sm">Access Control</h3>
                <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
                  <li>Role-based access controls</li>
                  <li>Multi-factor authentication available</li>
                  <li>Regular access reviews</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-sm">Infrastructure</h3>
                <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
                  <li>SOC 2 compliant hosting</li>
                  <li>Regular security patching</li>
                  <li>DDoS protection</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-sm">Monitoring</h3>
                <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
                  <li>24/7 security monitoring</li>
                  <li>Automated threat detection</li>
                  <li>Incident response procedures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 8. Data Retention */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              8. Data Retention
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Data Type</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-gray-300">Account data</td>
                    <td className="py-3 px-4 text-gray-400">Duration of account + 30 days after deletion</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-gray-300">Learning progress & certificates</td>
                    <td className="py-3 px-4 text-gray-400">Duration of account + 7 years (for verification)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-gray-300">Transaction & billing data</td>
                    <td className="py-3 px-4 text-gray-400">7 years (UK tax requirements)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-gray-300">Support tickets</td>
                    <td className="py-3 px-4 text-gray-400">3 years after resolution</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-gray-300">Analytics data</td>
                    <td className="py-3 px-4 text-gray-400">26 months (anonymised thereafter)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Security logs</td>
                    <td className="py-3 px-4 text-gray-400">12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 9. Your Rights */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              9. Your Rights Under UK GDPR
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You have the following rights regarding your personal data. To exercise any of these rights, contact us at{' '}
              <a href="mailto:info@elec-mate.com" className="text-yellow-400 hover:underline">info@elec-mate.com</a>.
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Right of Access (Article 15)</h3>
                <p className="text-gray-300 text-sm">Request a copy of the personal data we hold about you. You can also download your data directly from Settings &gt; Privacy.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Right to Rectification (Article 16)</h3>
                <p className="text-gray-300 text-sm">Request correction of inaccurate or incomplete personal data. You can update most information directly in your profile settings.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Right to Erasure (Article 17)</h3>
                <p className="text-gray-300 text-sm">Request deletion of your personal data ("right to be forgotten"). We will comply unless we have a legal obligation to retain the data.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Right to Restriction (Article 18)</h3>
                <p className="text-gray-300 text-sm">Request that we limit the processing of your personal data in certain circumstances.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Right to Data Portability (Article 20)</h3>
                <p className="text-gray-300 text-sm">Receive your data in a structured, commonly used format (JSON). Available via Settings &gt; Privacy &gt; Download My Data.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Right to Object (Article 21)</h3>
                <p className="text-gray-300 text-sm">Object to processing based on legitimate interests, including profiling. You can opt out of analytics via Settings &gt; Privacy.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Right to Withdraw Consent</h3>
                <p className="text-gray-300 text-sm">Where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-1">Rights Related to Automated Decision Making (Article 22)</h3>
                <p className="text-gray-300 text-sm">We do not make any solely automated decisions that produce legal effects or significantly affect you.</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mt-4">
              We will respond to valid requests within one month. In complex cases, we may extend this by two months, but we will inform you if this is necessary.
            </p>
          </section>

          {/* 10. Cookies */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">10. Cookies & Tracking</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              We use cookies and similar technologies to provide and improve our services. For detailed information about the cookies we use and how to manage your preferences, please see our{' '}
              <Link to="/cookies" className="text-yellow-400 hover:underline">Cookie Policy</Link>.
            </p>
          </section>

          {/* 11. Children */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              11. Children's Privacy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Elec-Mate is designed for professional use and is not intended for children under 16. We do not knowingly collect personal data from children under 16. If you believe we have inadvertently collected such data, please contact us immediately at{' '}
              <a href="mailto:info@elec-mate.com" className="text-yellow-400 hover:underline">info@elec-mate.com</a>{' '}
              and we will delete it promptly.
            </p>
          </section>

          {/* 12. Changes */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              12. Changes to This Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by email and/or a prominent notice on our platform at least 30 days before the changes take effect. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* 13. Complaints */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Scale className="h-5 w-5" />
              13. Complaints
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              If you are unhappy with how we have handled your personal data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO):
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-medium">Information Commissioner's Office</p>
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
            <p className="text-gray-400 text-sm mt-3">
              However, we would appreciate the opportunity to address your concerns before you approach the ICO. Please contact us first.
            </p>
          </section>

          {/* 14. Contact */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              14. Contact Us
            </h2>
            <p className="text-gray-300 mb-4">
              For any questions, concerns, or requests regarding this Privacy Policy or your personal data:
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
            <p className="text-gray-400 text-sm mt-3">
              We aim to respond to all enquiries within 5 working days.
            </p>
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

export default PrivacyPolicy;
