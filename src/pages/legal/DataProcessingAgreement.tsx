import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ArrowLeft, FileText, Building2, Shield, Database, Lock, AlertTriangle, Globe, Users, Mail } from "lucide-react";

const DataProcessingAgreement = () => {
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
            <FileText className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Data Processing Agreement</h1>
            <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <Card className="bg-cyan-500/10 border-cyan-500/20 mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium mb-1">For Business & Enterprise Customers</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This Data Processing Agreement ("DPA") applies to organisations using Elec-Mate's employer or enterprise services. It supplements our standard Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Parties & Definitions */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">1. Parties & Definitions</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">"Controller"</strong> means the organisation (you) that determines the purposes and means of processing personal data.</p>
              <p><strong className="text-white">"Processor"</strong> means Elec-Mate Ltd, which processes personal data on behalf of the Controller.</p>
              <p><strong className="text-white">"Personal Data"</strong> means any information relating to an identified or identifiable natural person as defined under UK GDPR.</p>
              <p><strong className="text-white">"Processing"</strong> means any operation performed on personal data, including collection, storage, use, and deletion.</p>
            </div>
          </section>

          {/* Subject Matter */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Database className="h-5 w-5" />
              2. Subject Matter of Processing
            </h2>
            <p className="text-gray-300 mb-3">
              This DPA governs the processing of personal data in connection with Elec-Mate's employer services, including:
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Data Categories</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Employee names and contact details</li>
                  <li>Professional qualifications and certifications</li>
                  <li>Training progress and completion records</li>
                  <li>Elec-ID verification data</li>
                  <li>Work site assignments and schedules</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Processing Purposes</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Providing team management and tracking services</li>
                  <li>Verifying employee qualifications via Elec-ID</li>
                  <li>Delivering training and CPD content</li>
                  <li>Generating compliance reports</li>
                  <li>Processing subscription payments</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Processor Obligations */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              3. Processor Obligations
            </h2>
            <p className="text-gray-300 mb-3">
              As the data processor, Elec-Mate agrees to:
            </p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li>Process personal data only on documented instructions from the Controller</li>
              <li>Ensure persons authorised to process data are bound by confidentiality obligations</li>
              <li>Implement appropriate technical and organisational security measures</li>
              <li>Engage sub-processors only with prior authorisation and equivalent contractual protections</li>
              <li>Assist the Controller in responding to data subject requests</li>
              <li>Assist the Controller in ensuring compliance with Articles 32-36 of UK GDPR</li>
              <li>Delete or return all personal data upon termination of services</li>
              <li>Make available information necessary to demonstrate compliance</li>
            </ul>
          </section>

          {/* Sub-Processors */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Users className="h-5 w-5" />
              4. Sub-Processors
            </h2>
            <p className="text-gray-300 mb-3">
              Elec-Mate uses the following sub-processors to deliver our services:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Sub-Processor</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Purpose</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-white">Supabase</td>
                    <td className="py-3 px-4 text-gray-400">Database & Authentication</td>
                    <td className="py-3 px-4 text-gray-400">EU (Frankfurt)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-white">Stripe</td>
                    <td className="py-3 px-4 text-gray-400">Payment Processing</td>
                    <td className="py-3 px-4 text-gray-400">USA (SCCs)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-white">Vercel</td>
                    <td className="py-3 px-4 text-gray-400">Website Hosting</td>
                    <td className="py-3 px-4 text-gray-400">EU (Ireland)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-white">PostHog</td>
                    <td className="py-3 px-4 text-gray-400">Analytics (optional)</td>
                    <td className="py-3 px-4 text-gray-400">EU</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white">OpenAI</td>
                    <td className="py-3 px-4 text-gray-400">AI Features</td>
                    <td className="py-3 px-4 text-gray-400">USA (SCCs)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              We will notify you of any intended changes to sub-processors, giving you the opportunity to object.
            </p>
          </section>

          {/* Security Measures */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              5. Security Measures
            </h2>
            <p className="text-gray-300 mb-3">
              We implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Technical Measures</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>TLS 1.3 encryption in transit</li>
                  <li>AES-256 encryption at rest</li>
                  <li>Secure password hashing (bcrypt)</li>
                  <li>Regular security patching</li>
                  <li>Network firewalls and DDoS protection</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">Organisational Measures</h3>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Role-based access controls</li>
                  <li>Staff confidentiality agreements</li>
                  <li>Security awareness training</li>
                  <li>Incident response procedures</li>
                  <li>Regular access reviews</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Breach Notification */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              6. Data Breach Notification
            </h2>
            <p className="text-gray-300 mb-3">
              In the event of a personal data breach, Elec-Mate will:
            </p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li>Notify the Controller without undue delay (within 48 hours where feasible) upon becoming aware of a breach</li>
              <li>Provide information about the nature of the breach, categories of data affected, and approximate number of data subjects concerned</li>
              <li>Describe the likely consequences of the breach</li>
              <li>Describe the measures taken or proposed to address the breach</li>
              <li>Cooperate with the Controller in notifying the ICO and affected data subjects where required</li>
            </ul>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              7. International Data Transfers
            </h2>
            <p className="text-gray-300 mb-3">
              Where personal data is transferred outside the UK, we ensure appropriate safeguards are in place:
            </p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li><strong className="text-white">EU/EEA:</strong> Covered by UK adequacy decision</li>
              <li><strong className="text-white">USA:</strong> Standard Contractual Clauses (SCCs) with supplementary measures</li>
              <li><strong className="text-white">Other countries:</strong> UK Government approved mechanisms only</li>
            </ul>
            <p className="text-gray-400 text-sm mt-3">
              Upon request, we can provide copies of the relevant transfer mechanisms.
            </p>
          </section>

          {/* Data Subject Rights */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">8. Assisting with Data Subject Rights</h2>
            <p className="text-gray-300 mb-3">
              We will assist you in fulfilling your obligations to respond to data subject requests, including:
            </p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li>Access requests (providing copies of personal data)</li>
              <li>Rectification requests (correcting inaccurate data)</li>
              <li>Erasure requests (deleting personal data)</li>
              <li>Restriction requests (limiting processing)</li>
              <li>Portability requests (exporting data in machine-readable format)</li>
              <li>Objection requests (stopping certain processing activities)</li>
            </ul>
          </section>

          {/* Audit Rights */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">9. Audit Rights</h2>
            <p className="text-gray-300 leading-relaxed">
              The Controller may audit our compliance with this DPA upon reasonable notice. We will provide reasonable assistance and access to relevant information, systems, and personnel. Audits shall be conducted during normal business hours and shall not unreasonably interfere with our operations.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3">10. Duration & Termination</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              This DPA remains in effect for the duration of our service agreement. Upon termination:
            </p>
            <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li>We will return or delete all personal data within 30 days, unless retention is required by law</li>
              <li>Upon request, we will certify deletion in writing</li>
              <li>Confidentiality obligations survive termination</li>
            </ul>
          </section>

          {/* Request a Signed Copy */}
          <section>
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Need a Signed DPA?</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Enterprise customers requiring a countersigned Data Processing Agreement should contact our legal team. We can provide customised DPAs for specific requirements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us
            </h2>
            <p className="text-gray-300 mb-3">
              For DPA-related enquiries:
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-medium">Elec-Mate Legal Team</p>
              <p className="text-gray-400 text-sm">Email: legal@elec-mate.com</p>
              <p className="text-gray-400 text-sm mt-2">Data Protection Officer: dpo@elec-mate.com</p>
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

export default DataProcessingAgreement;
