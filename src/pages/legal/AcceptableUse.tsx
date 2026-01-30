import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ArrowLeft, Scale, Ban, Shield, AlertTriangle, Users, Flag, FileText, Mail } from "lucide-react";

const AcceptableUse = () => {
  const lastUpdated = "30 January 2026";

  return (
    <div className="bg-black text-white">
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
            <Scale className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Acceptable Use Policy</h1>
            <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <Card className="bg-neutral-900 border-white/10 mb-6">
          <CardContent className="p-4 sm:p-6">
            <p className="text-gray-300 leading-relaxed">
              This Acceptable Use Policy ("AUP") sets out the rules for using the Elec-Mate platform. By using our services, you agree to comply with this policy. This AUP should be read alongside our <Link to="/terms" className="text-yellow-400 hover:underline">Terms of Service</Link>.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Permitted Use */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Permitted Use
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Elec-Mate is designed for UK electrical professionals, including:
            </p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li>Apprentices studying for electrical qualifications</li>
              <li>Qualified electricians seeking professional tools and CPD</li>
              <li>Employers managing electrical teams and hiring</li>
              <li>Colleges providing electrical training courses</li>
            </ul>
            <p className="text-gray-300 mt-3">
              You may use the platform for legitimate professional and educational purposes in accordance with our Terms of Service.
            </p>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Ban className="h-5 w-5" />
              Prohibited Activities
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              You must NOT use Elec-Mate to:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h3 className="font-semibold text-white mb-2">Illegal Activities</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Conduct any unlawful or fraudulent activities</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Engage in money laundering or financial fraud</li>
                  <li>Infringe intellectual property rights</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h3 className="font-semibold text-white mb-2">Harmful Content</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Upload malware, viruses, or malicious code</li>
                  <li>Post content that is defamatory, abusive, or threatening</li>
                  <li>Share inappropriate, offensive, or explicit material</li>
                  <li>Spread misinformation about electrical regulations or safety</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h3 className="font-semibold text-white mb-2">Platform Abuse</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Create multiple accounts to circumvent restrictions</li>
                  <li>Share your account credentials with others</li>
                  <li>Use automated tools to scrape content or data</li>
                  <li>Attempt to bypass security measures or access controls</li>
                  <li>Interfere with the platform's operation or other users</li>
                  <li>Reverse engineer or decompile our software</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h3 className="font-semibold text-white mb-2">Credential Fraud</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Misrepresent your qualifications or certifications</li>
                  <li>Falsify Elec-ID credentials or verification status</li>
                  <li>Impersonate another person or organisation</li>
                  <li>Provide false information during registration</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h3 className="font-semibold text-white mb-2">Commercial Misuse</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Resell or redistribute our content without permission</li>
                  <li>Use the platform for spam or unsolicited marketing</li>
                  <li>Post misleading job advertisements or recruitment scams</li>
                  <li>Use study materials for commercial training without a licence</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Responsibilities
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              As a user of Elec-Mate, you are responsible for:
            </p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li>Keeping your account credentials secure and confidential</li>
              <li>Ensuring all information you provide is accurate and up-to-date</li>
              <li>Complying with all applicable laws and regulations</li>
              <li>Respecting other users and maintaining professional conduct</li>
              <li>Reporting any security vulnerabilities or policy violations</li>
              <li>Using our tools and calculators for reference only, not as the sole basis for electrical work</li>
            </ul>
          </section>

          {/* Enforcement */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Enforcement & Consequences
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              We take violations of this policy seriously. If you breach this AUP, we may:
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Warnings</h3>
                <p className="text-gray-300 text-sm">Issue a warning for minor or first-time violations.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Temporary Suspension</h3>
                <p className="text-gray-300 text-sm">Suspend your account while we investigate reported violations.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Permanent Termination</h3>
                <p className="text-gray-300 text-sm">Terminate your account without refund for serious or repeated violations.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Legal Action</h3>
                <p className="text-gray-300 text-sm">Report illegal activities to law enforcement and pursue legal remedies where appropriate.</p>
              </div>
            </div>
          </section>

          {/* Reporting */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Flag className="h-5 w-5" />
              Reporting Violations
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              If you become aware of any violations of this policy, please report them to us immediately. We investigate all reports and take appropriate action.
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-medium">Report a Violation</p>
              <p className="text-gray-400 text-sm mt-1">Email: abuse@elec-mate.com</p>
              <p className="text-gray-400 text-sm mt-2">Please include:</p>
              <ul className="text-gray-400 text-sm list-disc list-inside mt-1">
                <li>Description of the violation</li>
                <li>Username or profile link (if applicable)</li>
                <li>Screenshots or evidence</li>
                <li>Date and time of the incident</li>
              </ul>
            </div>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Changes to This Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Acceptable Use Policy from time to time. We will notify you of significant changes via email or in-app notification. Continued use of Elec-Mate after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us
            </h2>
            <p className="text-gray-300 mb-3">
              For questions about this policy:
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-medium">Elec-Mate Support</p>
              <p className="text-gray-400 text-sm">Email: support@elec-mate.com</p>
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

export default AcceptableUse;
