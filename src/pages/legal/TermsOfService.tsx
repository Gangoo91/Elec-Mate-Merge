import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ArrowLeft, FileText, AlertTriangle, CreditCard, Ban, Scale, RefreshCw } from "lucide-react";

const TermsOfService = () => {
  const lastUpdated = "5 January 2026";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full px-4 pt-6 pb-4 sm:pt-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </Link>
          <Link to="/auth/signup">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
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
              Welcome to Elec-Mate. These Terms of Service ("Terms") govern your use of our platform and services. By creating an account or using Elec-Mate, you agree to these Terms.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Acceptance */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              By accessing or using Elec-Mate, you confirm that you:
            </p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Are at least 16 years of age</li>
              <li>Have the legal capacity to enter into these Terms</li>
              <li>Will use the platform in accordance with these Terms</li>
              <li>Have read and understood our Privacy Policy</li>
            </ul>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">2. Our Services</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Elec-Mate provides:
            </p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Training aids and study materials to support electrical qualifications</li>
              <li>Professional tools and calculators aligned with BS7671</li>
              <li>Elec-ID digital credential system (optional)</li>
              <li>Progress tracking and learning management</li>
              <li>Team and business management tools (for employers)</li>
            </ul>
          </section>

          {/* Account */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">3. Your Account</h2>
            <div className="space-y-3 text-gray-300">
              <p>You are responsible for:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Providing accurate and complete registration information</li>
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorised access</li>
              </ul>
              <p className="text-sm text-gray-400 mt-3">
                We reserve the right to suspend or terminate accounts that violate these Terms.
              </p>
            </div>
          </section>

          {/* Free Trial & Subscriptions */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              4. Free Trial & Subscriptions
            </h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">7-Day Free Trial:</strong> New users receive a 7-day free trial with full access to all features. No payment card is required during the trial period.</p>
              <p><strong className="text-white">Subscription:</strong> After the trial, continued access requires a paid subscription. Prices are displayed at checkout and may change with notice.</p>
              <p><strong className="text-white">Cancellation:</strong> You may cancel your subscription at any time. Access continues until the end of your billing period.</p>
              <p><strong className="text-white">Refunds:</strong> We offer a 14-day refund policy for annual subscriptions if you're not satisfied.</p>
            </div>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Ban className="h-5 w-5" />
              5. Acceptable Use
            </h2>
            <p className="text-gray-300 mb-3">You agree NOT to:</p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Share your account credentials with others</li>
              <li>Copy, distribute, or reproduce our content without permission</li>
              <li>Use the platform for any illegal purpose</li>
              <li>Attempt to gain unauthorised access to our systems</li>
              <li>Upload malicious code or interfere with platform operation</li>
              <li>Misrepresent your qualifications or Elec-ID credentials</li>
              <li>Use automated tools to scrape or access our content</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">6. Intellectual Property</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">Our Content:</strong> All content on Elec-Mate, including text, graphics, logos, and software, is owned by or licensed to us and protected by intellectual property laws.</p>
              <p><strong className="text-white">Your Content:</strong> You retain ownership of any content you submit (e.g., portfolio items, notes). By submitting content, you grant us a licence to use it for providing our services.</p>
              <p><strong className="text-white">Feedback:</strong> Any feedback or suggestions you provide may be used by us without obligation to you.</p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              7. Disclaimers
            </h2>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-4">
              <p className="text-amber-200 text-sm">
                <strong>Important:</strong> Elec-Mate provides training aids and tools for reference purposes. Our content is designed to supplement — not replace — formal education, manufacturer instructions, or professional training.
              </p>
            </div>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>The platform is provided "as is" without warranties of any kind. We do not guarantee:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Continuous, uninterrupted access to our services</li>
                <li>That content is always current with latest regulations</li>
                <li>That use of our tools will result in exam success</li>
              </ul>
              <p className="mt-3">
                Always refer to official BS7671 documentation and seek qualified professional advice for real-world electrical work.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Scale className="h-5 w-5" />
              8. Limitation of Liability
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              To the maximum extent permitted by law, Elec-Mate shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our total liability for any claims arising from these Terms shall not exceed the amount you paid to us in the 12 months preceding the claim.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              9. Changes to Terms
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may update these Terms from time to time. We will notify you of significant changes via email or in-app notification. Continued use of Elec-Mate after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">10. Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">11. Contact Us</h2>
            <p className="text-gray-300 mb-3">
              For questions about these Terms:
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-medium">Elec-Mate Support</p>
              <p className="text-gray-400 text-sm">Email: support@elec-mate.co.uk</p>
            </div>
          </section>
        </div>

        {/* Back button */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <Link to="/auth/signup">
            <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign Up
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
