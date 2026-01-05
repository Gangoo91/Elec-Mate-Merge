import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ArrowLeft, Shield, Mail, Lock, Database, UserCheck, Trash2, Globe } from "lucide-react";

const PrivacyPolicy = () => {
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
              At Elec-Mate, we take your privacy seriously. This policy explains how we collect, use, and protect your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Who We Are */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Who We Are
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Elec-Mate is an electrical career platform designed for UK electrical professionals, including apprentices, qualified electricians, and employers. We are the data controller for your personal information.
            </p>
            <p className="text-gray-400 text-sm">
              Contact: privacy@elec-mate.co.uk
            </p>
          </section>

          {/* Data We Collect */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data We Collect
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Account Information</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Name and email address</li>
                  <li>Password (encrypted)</li>
                  <li>Role (apprentice, electrician, or employer)</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Professional Information</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>ECS card type and status</li>
                  <li>Qualifications and certifications</li>
                  <li>Training history and progress</li>
                  <li>Work experience (if using Elec-ID)</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Usage Data</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Study progress and quiz results</li>
                  <li>Feature usage patterns</li>
                  <li>Device and browser information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              How We Use Your Data
            </h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">To provide our services:</strong> We use your data to deliver the Elec-Mate platform, including study materials, calculators, and certification tracking.</p>
              <p><strong className="text-white">To personalise your experience:</strong> Your role and progress help us recommend relevant content.</p>
              <p><strong className="text-white">To issue Elec-ID credentials:</strong> If you opt in, we create and maintain your digital professional credential.</p>
              <p><strong className="text-white">To communicate with you:</strong> Service updates, security alerts, and (with consent) marketing communications.</p>
              <p><strong className="text-white">To improve our platform:</strong> Anonymised usage data helps us enhance features and fix issues.</p>
            </div>
          </section>

          {/* Legal Basis */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Legal Basis for Processing
            </h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">Contract:</strong> Processing necessary to provide our services to you.</p>
              <p><strong className="text-white">Consent:</strong> For marketing communications and optional features like Elec-ID.</p>
              <p><strong className="text-white">Legitimate interests:</strong> To improve our services and prevent fraud.</p>
              <p><strong className="text-white">Legal obligation:</strong> Where required by law or regulation.</p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Data Security
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>All data encrypted in transit (HTTPS/TLS)</li>
              <li>Passwords hashed using secure algorithms</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Data hosted on secure UK/EU servers</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Your Rights
            </h2>
            <p className="text-gray-300 mb-3">Under UK GDPR, you have the right to:</p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li><strong className="text-white">Access</strong> — Request a copy of your personal data</li>
              <li><strong className="text-white">Rectification</strong> — Correct inaccurate or incomplete data</li>
              <li><strong className="text-white">Erasure</strong> — Request deletion of your data ("right to be forgotten")</li>
              <li><strong className="text-white">Restriction</strong> — Limit how we process your data</li>
              <li><strong className="text-white">Portability</strong> — Receive your data in a portable format</li>
              <li><strong className="text-white">Object</strong> — Object to certain types of processing</li>
              <li><strong className="text-white">Withdraw consent</strong> — Withdraw any consent previously given</li>
            </ul>
            <p className="text-gray-400 text-sm mt-4">
              To exercise these rights, contact us at privacy@elec-mate.co.uk. We will respond within 30 days.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">Data Retention</h2>
            <p className="text-gray-300 leading-relaxed">
              We retain your data for as long as your account is active or as needed to provide services. If you delete your account, we will remove your personal data within 30 days, except where we are required to retain it for legal or regulatory purposes.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us
            </h2>
            <p className="text-gray-300 mb-3">
              For privacy-related questions or to exercise your rights:
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-medium">Elec-Mate Data Protection</p>
              <p className="text-gray-400 text-sm">Email: privacy@elec-mate.co.uk</p>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.
            </p>
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

export default PrivacyPolicy;
