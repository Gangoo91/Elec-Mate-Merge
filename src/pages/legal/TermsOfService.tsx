import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ArrowLeft, FileText, AlertTriangle, CreditCard, Ban, Scale, RefreshCw, Shield, Users, Lock, Mail, Globe, Clock, Briefcase, BookOpen, BadgeCheck, Receipt, Gavel, XCircle } from "lucide-react";

const TermsOfService = () => {
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
            <FileText className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Terms of Service</h1>
            <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <Card className="bg-neutral-900 border-white/10 mb-6">
          <CardContent className="p-4 sm:p-6">
            <p className="text-gray-300 leading-relaxed">
              These Terms of Service ("Terms") constitute a legally binding agreement between you and Elec-Mate Ltd ("Elec-Mate", "we", "us", "our"), governing your access to and use of the Elec-Mate platform, including our website, mobile applications, and all related services.
            </p>
            <p className="text-gray-400 text-sm mt-3">
              <strong className="text-white">Effective Date:</strong> {effectiveDate}
            </p>
            <p className="text-amber-400 text-sm mt-2 font-medium">
              Please read these Terms carefully. By creating an account or using our services, you agree to be bound by these Terms.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* 1. Definitions */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">1. Definitions</h2>
            <div className="space-y-2 text-gray-300 text-sm">
              <p><strong className="text-white">"Account"</strong> means your registered user account on the Elec-Mate platform.</p>
              <p><strong className="text-white">"Content"</strong> means all text, images, videos, audio, data, and other materials available through our Services.</p>
              <p><strong className="text-white">"Elec-ID"</strong> means our digital professional credential system for electrical professionals.</p>
              <p><strong className="text-white">"Platform"</strong> means the Elec-Mate website, mobile applications, and all related technology infrastructure.</p>
              <p><strong className="text-white">"Services"</strong> means all features, tools, content, and functionality provided through the Platform.</p>
              <p><strong className="text-white">"Subscription"</strong> means a paid plan that provides access to premium features.</p>
              <p><strong className="text-white">"User"</strong> or <strong className="text-white">"you"</strong> means any individual or entity accessing or using our Services.</p>
              <p><strong className="text-white">"User Content"</strong> means any content you submit, upload, or create through our Services.</p>
            </div>
          </section>

          {/* 2. Acceptance & Eligibility */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              2. Acceptance & Eligibility
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              By accessing or using Elec-Mate, you represent and warrant that you:
            </p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li>Are at least 16 years of age (or 18 for employer accounts)</li>
              <li>Have the legal capacity to enter into a binding contract</li>
              <li>Are not prohibited from using our Services under applicable law</li>
              <li>Will provide accurate, current, and complete information</li>
              <li>Have read and understood our <Link to="/privacy" className="text-yellow-400 hover:underline">Privacy Policy</Link></li>
              <li>Will comply with all applicable laws and regulations</li>
            </ul>
            <p className="text-gray-400 text-sm mt-3">
              If you are accepting these Terms on behalf of an organisation, you represent that you have authority to bind that organisation.
            </p>
          </section>

          {/* 3. Account Registration */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Users className="h-5 w-5" />
              3. Account Registration & Security
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Account Types</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li><strong className="text-white">Apprentice:</strong> For individuals undertaking electrical apprenticeships</li>
                  <li><strong className="text-white">Electrician:</strong> For qualified electrical professionals</li>
                  <li><strong className="text-white">Employer:</strong> For businesses managing electrical teams</li>
                  <li><strong className="text-white">College:</strong> For educational institutions</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Your Responsibilities</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Provide accurate, truthful registration information</li>
                  <li>Keep your login credentials secure and confidential</li>
                  <li>Notify us immediately of any unauthorised access</li>
                  <li>Maintain only one active account per person</li>
                  <li>Keep your account information up to date</li>
                </ul>
              </div>

              <p className="text-gray-400 text-sm">
                You are solely responsible for all activities that occur under your Account. We are not liable for any loss or damage arising from your failure to protect your credentials.
              </p>
            </div>
          </section>

          {/* 4. Our Services */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              4. Description of Services
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Elec-Mate provides a platform for UK electrical professionals, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <BookOpen className="h-5 w-5 text-blue-400 mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">Learning & Training</h3>
                <p className="text-gray-400 text-xs">Study materials, quizzes, mock exams, and CPD tracking aligned with UK electrical qualifications.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Zap className="h-5 w-5 text-yellow-400 mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">Professional Tools</h3>
                <p className="text-gray-400 text-xs">Calculators, reference materials, and tools aligned with BS7671 and UK regulations.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <BadgeCheck className="h-5 w-5 text-green-400 mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">Elec-ID</h3>
                <p className="text-gray-400 text-xs">Digital professional credential system for verification of qualifications.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Receipt className="h-5 w-5 text-purple-400 mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">Business Tools</h3>
                <p className="text-gray-400 text-xs">Invoicing, quoting, customer management, and team administration.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-200 text-sm font-medium">Important Disclaimer</p>
                  <p className="text-amber-200/80 text-xs mt-1">
                    Our content is designed to supplement — not replace — formal education, manufacturer instructions, or professional training. Always refer to official BS7671 documentation and seek qualified professional advice for real-world electrical work. Elec-Mate does not guarantee exam success or professional competency.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Subscriptions & Payments */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              5. Subscriptions, Payments & Fees
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">5.1 Free Trial</h3>
                <p className="text-gray-300 text-sm">New users may receive a free trial period with access to premium features. No payment card is required during the trial. At the end of the trial, you must subscribe to continue accessing premium features.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">5.2 Subscription Plans</h3>
                <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                  <li>Subscription fees are displayed at checkout and may vary by plan</li>
                  <li>All prices are in GBP and inclusive of VAT where applicable</li>
                  <li>Subscriptions automatically renew unless cancelled</li>
                  <li>We may change prices with 30 days' notice; changes apply at next renewal</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">5.3 Payment Processing</h3>
                <p className="text-gray-300 text-sm mb-2">Payments are processed securely by Stripe. By making a payment, you agree to Stripe's terms of service.</p>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>We accept major credit/debit cards</li>
                  <li>You authorise us to charge your payment method for recurring subscriptions</li>
                  <li>Failed payments may result in service suspension</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <h3 className="font-semibold text-white mb-2">5.4 Invoice Payment Processing Fees</h3>
                <p className="text-gray-300 text-sm mb-3">
                  When your customers pay invoices through Elec-Mate's payment system, the following fees apply:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-3 text-gray-400 font-medium">Fee Type</th>
                        <th className="text-left py-2 px-3 text-gray-400 font-medium">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-3">Elec-Mate Platform Fee</td>
                        <td className="py-2 px-3">1% of transaction value</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-3">Stripe Processing Fee</td>
                        <td className="py-2 px-3">1.5% + 20p per transaction</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-white">Total Fees</td>
                        <td className="py-2 px-3 font-medium text-white">2.5% + 20p per transaction</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-400 text-xs mt-3">
                  Fees are deducted from the payment amount before funds are transferred to your connected Stripe account. Stripe fees are set by Stripe and subject to change.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">5.5 Refunds</h3>
                <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                  <li><strong className="text-white">Annual subscriptions:</strong> 14-day money-back guarantee from purchase date</li>
                  <li><strong className="text-white">Monthly subscriptions:</strong> No refunds for partial months; cancel anytime</li>
                  <li><strong className="text-white">Invoice payments:</strong> Refunds for customer invoice payments are your responsibility</li>
                </ul>
                <p className="text-gray-400 text-xs mt-2">Refund requests must be submitted to info@elec-mate.com within the eligible period.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">5.6 Cancellation</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>You may cancel your subscription at any time via Settings</li>
                  <li>Access continues until the end of your current billing period</li>
                  <li>No refunds for unused time on monthly plans</li>
                  <li>Your data remains accessible for 30 days after cancellation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Acceptable Use */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Ban className="h-5 w-5" />
              6. Acceptable Use Policy
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              You agree NOT to use our Services to:
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h3 className="font-semibold text-white mb-2">Prohibited Activities</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Misrepresent your identity, qualifications, or credentials</li>
                  <li>Falsify Elec-ID information or verification status</li>
                  <li>Share, sell, or transfer your account credentials</li>
                  <li>Access another user's account without permission</li>
                  <li>Copy, distribute, or reproduce our content without authorisation</li>
                  <li>Use automated tools to scrape, harvest, or extract data</li>
                  <li>Attempt to reverse engineer or decompile our software</li>
                  <li>Circumvent security measures or access restrictions</li>
                  <li>Upload malware, viruses, or malicious code</li>
                  <li>Interfere with the Platform's operation or infrastructure</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Post defamatory, obscene, or offensive content</li>
                  <li>Engage in fraud, money laundering, or financial crimes</li>
                  <li>Use our Services for spam or unsolicited marketing</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              For detailed guidelines, see our <Link to="/acceptable-use" className="text-yellow-400 hover:underline">Acceptable Use Policy</Link>.
            </p>
          </section>

          {/* 7. Intellectual Property */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              7. Intellectual Property Rights
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">7.1 Our Content</h3>
                <p className="text-gray-300 text-sm">All content, features, and functionality of the Platform — including but not limited to text, graphics, logos, icons, images, audio, video, software, and the compilation thereof — are owned by Elec-Mate or our licensors and are protected by UK and international copyright, trademark, and other intellectual property laws.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">7.2 Limited Licence</h3>
                <p className="text-gray-300 text-sm">We grant you a limited, non-exclusive, non-transferable, revocable licence to access and use our Services for your personal or internal business purposes, subject to these Terms. This licence does not include the right to:</p>
                <ul className="text-gray-300 text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Modify, copy, or create derivative works</li>
                  <li>Sell, resell, or commercially exploit our content</li>
                  <li>Use content for training purposes outside your organisation</li>
                  <li>Remove any copyright or proprietary notices</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">7.3 Your Content</h3>
                <p className="text-gray-300 text-sm">You retain ownership of User Content you create. By submitting content, you grant us a worldwide, royalty-free, non-exclusive licence to use, reproduce, modify, and display such content solely for the purpose of providing and improving our Services. You represent that you have all necessary rights to grant this licence.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">7.4 Feedback</h3>
                <p className="text-gray-300 text-sm">Any feedback, suggestions, or ideas you provide about our Services may be used by us without any obligation to you.</p>
              </div>
            </div>
          </section>

          {/* 8. Elec-ID */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <BadgeCheck className="h-5 w-5" />
              8. Elec-ID Digital Credentials
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">8.1 Verification</h3>
                <p className="text-gray-300 text-sm">Elec-ID allows you to create a digital professional profile. You are solely responsible for the accuracy of information you provide. We may verify qualifications through third-party sources where possible, but we do not guarantee the accuracy or completeness of verification.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">8.2 Public Profiles</h3>
                <p className="text-gray-300 text-sm">If you enable a public Elec-ID profile, certain information will be visible to anyone with your verification link. You control what information is displayed. We are not responsible for how third parties use publicly available information.</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <h3 className="font-semibold text-amber-200 mb-2">8.3 No Employment Relationship</h3>
                <p className="text-amber-200/80 text-sm">Elec-ID is a verification tool only. We do not endorse, employ, or guarantee the work of any Elec-ID holder. Employers and clients are solely responsible for their own due diligence when hiring or engaging electrical professionals.</p>
              </div>
            </div>
          </section>

          {/* 9. Disclaimers & Warranties */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              9. Disclaimers & Warranties
            </h2>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-4">
              <p className="text-amber-200 text-sm font-medium">
                PLEASE READ THIS SECTION CAREFULLY AS IT LIMITS OUR LIABILITY TO YOU.
              </p>
            </div>

            <div className="space-y-3 text-gray-300 text-sm">
              <p><strong className="text-white">9.1</strong> Our Services are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied.</p>

              <p><strong className="text-white">9.2</strong> We do not warrant that:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>The Services will be uninterrupted, secure, or error-free</li>
                <li>Results obtained will be accurate or reliable</li>
                <li>The quality of any content will meet your expectations</li>
                <li>Any errors will be corrected</li>
              </ul>

              <p><strong className="text-white">9.3</strong> Our study materials and tools are for educational reference only. We do not guarantee:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Exam success or professional certification</li>
                <li>That content is current with the latest regulations</li>
                <li>Fitness for any particular professional purpose</li>
              </ul>

              <p><strong className="text-white">9.4</strong> You acknowledge that electrical work is inherently dangerous and that you must always follow proper safety procedures, manufacturer guidelines, and applicable regulations regardless of any content provided through our Services.</p>
            </div>
          </section>

          {/* 10. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Scale className="h-5 w-5" />
              10. Limitation of Liability
            </h2>
            <div className="space-y-3 text-gray-300 text-sm">
              <p><strong className="text-white">10.1</strong> To the maximum extent permitted by law, Elec-Mate and its directors, employees, agents, and affiliates shall not be liable for any:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Personal injury or property damage arising from your use of our Services</li>
                <li>Errors, mistakes, or inaccuracies in content</li>
                <li>Unauthorised access to your account or data</li>
                <li>Interruption or cessation of Services</li>
                <li>Actions of third parties using our Platform</li>
              </ul>

              <p><strong className="text-white">10.2</strong> Our total aggregate liability for any claims arising from or related to these Terms or our Services shall not exceed the greater of:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>The amount you paid to us in the 12 months preceding the claim, or</li>
                <li>£100</li>
              </ul>

              <p><strong className="text-white">10.3</strong> Nothing in these Terms excludes or limits liability for:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Death or personal injury caused by negligence</li>
                <li>Fraud or fraudulent misrepresentation</li>
                <li>Any liability that cannot be excluded by law</li>
              </ul>
            </div>
          </section>

          {/* 11. Indemnification */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">11. Indemnification</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              You agree to indemnify, defend, and hold harmless Elec-Mate and its officers, directors, employees, agents, and affiliates from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or related to:
            </p>
            <ul className="text-gray-300 text-sm mt-2 space-y-1 list-disc list-inside">
              <li>Your use of our Services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your User Content</li>
              <li>Any misrepresentation made by you</li>
            </ul>
          </section>

          {/* 12. Termination */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              12. Termination
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">12.1 Termination by You</h3>
                <p className="text-gray-300 text-sm">You may close your account at any time through Settings or by contacting us. Upon termination, your right to use our Services ceases immediately, though certain provisions of these Terms survive.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">12.2 Termination by Us</h3>
                <p className="text-gray-300 text-sm">We may suspend or terminate your access immediately, without notice, if you:</p>
                <ul className="text-gray-300 text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Breach these Terms or our Acceptable Use Policy</li>
                  <li>Engage in fraudulent or illegal activity</li>
                  <li>Fail to pay applicable fees</li>
                  <li>Pose a security risk to our Platform or users</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">12.3 Effect of Termination</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Your licence to use our Services terminates</li>
                  <li>You remain liable for any fees incurred before termination</li>
                  <li>We may delete your data after 30 days (subject to legal retention requirements)</li>
                  <li>Sections on IP, liability, indemnification, and governing law survive</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 13. Changes to Terms */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              13. Changes to These Terms
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              We may modify these Terms at any time. We will provide notice of material changes by:
            </p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Email to your registered address</li>
              <li>Prominent notice on our Platform</li>
              <li>In-app notification</li>
            </ul>
            <p className="text-gray-300 text-sm mt-3">
              Changes take effect 30 days after notice, unless otherwise specified. Continued use of our Services after changes constitutes acceptance of the modified Terms. If you disagree with changes, you must stop using our Services and close your account.
            </p>
          </section>

          {/* 14. Governing Law */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              14. Governing Law & Disputes
            </h2>
            <div className="space-y-3 text-gray-300 text-sm">
              <p><strong className="text-white">14.1 Governing Law:</strong> These Terms are governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law principles.</p>

              <p><strong className="text-white">14.2 Jurisdiction:</strong> Any disputes arising from or relating to these Terms or our Services shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

              <p><strong className="text-white">14.3 Informal Resolution:</strong> Before initiating formal proceedings, you agree to contact us at info@elec-mate.com to attempt to resolve the dispute informally. We will attempt to resolve disputes within 30 days.</p>

              <p><strong className="text-white">14.4 Consumer Rights:</strong> If you are a consumer, nothing in these Terms affects your statutory rights under the Consumer Rights Act 2015 or other applicable consumer protection legislation.</p>
            </div>
          </section>

          {/* 15. General Provisions */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">15. General Provisions</h2>
            <div className="space-y-3 text-gray-300 text-sm">
              <p><strong className="text-white">15.1 Entire Agreement:</strong> These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and Elec-Mate.</p>

              <p><strong className="text-white">15.2 Severability:</strong> If any provision of these Terms is found invalid or unenforceable, the remaining provisions continue in full force and effect.</p>

              <p><strong className="text-white">15.3 Waiver:</strong> Our failure to enforce any right or provision does not constitute a waiver of that right or provision.</p>

              <p><strong className="text-white">15.4 Assignment:</strong> You may not assign or transfer your rights under these Terms without our consent. We may assign our rights without restriction.</p>

              <p><strong className="text-white">15.5 Force Majeure:</strong> We are not liable for any failure or delay caused by circumstances beyond our reasonable control.</p>

              <p><strong className="text-white">15.6 Third-Party Rights:</strong> These Terms do not confer any rights on third parties under the Contracts (Rights of Third Parties) Act 1999.</p>
            </div>
          </section>

          {/* 16. Contact */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              16. Contact Us
            </h2>
            <p className="text-gray-300 mb-4">
              For questions about these Terms or our Services:
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-medium">Elec-Mate Ltd</p>
              <p className="text-gray-400 text-sm mt-2">
                Email: <a href="mailto:info@elec-mate.com" className="text-yellow-400 hover:underline">info@elec-mate.com</a>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Registered in England & Wales
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

export default TermsOfService;
