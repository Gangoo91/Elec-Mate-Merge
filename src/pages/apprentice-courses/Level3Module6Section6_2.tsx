/**
 * Level 3 Module 6 Section 6.2 - Installation Specifications
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Installation Specifications - Level 3 Module 6 Section 6.2";
const DESCRIPTION = "Learn to write professional installation specifications for electrical work. Cover material specifications, workmanship standards, testing requirements, and BS 7671 compliance criteria.";

const quickCheckQuestions = [
  { id: "check-1", question: "What is the primary purpose of an installation specification?", options: ["To increase costs", "To define required standards, materials and workmanship for the installation", "To confuse contractors", "To avoid testing"], correctIndex: 1, explanation: "Installation specifications clearly define the standards, materials, and workmanship required. They ensure all parties understand requirements and provide a basis for quality control." },
  { id: "check-2", question: "Which standard should be referenced for general electrical installation requirements in the UK?", options: ["BS 5839", "BS 7671", "BS EN 61439", "BS 5266"], correctIndex: 1, explanation: "BS 7671 (IET Wiring Regulations) is the fundamental standard for electrical installations in the UK. Specifications should reference this as the minimum compliance requirement." },
  { id: "check-3", question: "What should material specifications include?", options: ["Only prices", "Type, quality standards, and compliance marks (e.g., CE, UKCA, BSI)", "Only colours", "Nothing specific"], correctIndex: 1, explanation: "Material specifications should define: types of materials, quality standards, required certifications (CE, UKCA), compliance marks, and where applicable, approved manufacturers or equivalents." },
  { id: "check-4", question: "Why are workmanship standards included in specifications?", options: ["To make work harder", "To ensure consistent quality and professional installation practices", "To increase costs", "They are not needed"], correctIndex: 1, explanation: "Workmanship standards ensure installations are completed to consistent quality levels. They cover practices like cable fixing, terminations, labelling, and testing that affect safety and longevity." }
];

const quizQuestions = [
  { id: 1, question: "A specification for cable containment should include:", options: ["Only the colour", "Type, size, fixing centres, and fire rating where applicable", "Just the manufacturer", "Only the length"], correctAnswer: 1, explanation: "Cable containment specifications should cover: containment type (tray, trunking, conduit), size/capacity, material, fire rating where required, fixing methods and centres, and accessories needed." },
  { id: 2, question: "Testing requirements in specifications should reference:", options: ["No standards", "BS 7671 Part 6 and Guidance Note 3", "Only multimeter readings", "Arbitrary values"], correctAnswer: 1, explanation: "Testing specifications should reference BS 7671 Part 6 for requirements and IET Guidance Note 3 for procedures. They should list required tests and acceptable results." },
  { id: 3, question: "When specifying protective devices, you should include:", options: ["Only the amp rating", "Type, rating, breaking capacity, and characteristics (B, C, D)", "Just the brand name", "Nothing specific"], correctAnswer: 1, explanation: "Protective device specifications need: device type (MCB, RCBO), rating (A), characteristics (B, C, D), breaking capacity (kA), and RCD sensitivity where applicable." },
  { id: 4, question: "The phrase 'or approved equivalent' in specifications allows:", options: ["Any product regardless of quality", "Alternative products meeting the same performance criteria", "Cheaper but inferior products", "No alternatives"], correctAnswer: 1, explanation: "'Or approved equivalent' allows flexibility while maintaining standards. Alternative products must meet the same performance specifications and be approved before substitution." },
  { id: 5, question: "Compliance documentation requirements should specify:", options: ["Nothing", "Certificates, test results, manufacturer warranties, and as-built drawings", "Only verbal confirmation", "Just email confirmation"], correctAnswer: 1, explanation: "Specifications should require: installation certificates (EIC), test results schedules, manufacturer documentation, warranties, equipment data sheets, and as-built drawings." },
  { id: 6, question: "Cable specifications typically include:", options: ["Just the colour", "Type, conductor material, insulation, size range, and fire performance", "Only the length", "Only voltage rating"], correctAnswer: 1, explanation: "Cable specifications cover: cable type (e.g., 6242Y), conductor material (copper), insulation type (PVC, XLPE), size range, voltage rating, and fire performance (LS0H, flame retardant) where required." },
  { id: 7, question: "Quality assurance clauses in specifications should address:", options: ["Nothing specific", "Inspection points, hold points, and approval procedures", "Only final testing", "Random checks"], correctAnswer: 1, explanation: "Quality assurance clauses define: inspection stages, witness points, hold points requiring approval before proceeding, documentation requirements, and non-conformance procedures." },
  { id: 8, question: "Environmental considerations in specifications may include:", options: ["Nothing", "IP ratings, temperature ranges, and corrosion protection requirements", "Only indoor work", "Just paint colours"], correctAnswer: 1, explanation: "Environmental specifications cover: IP ratings for enclosures, operating temperature ranges, humidity considerations, corrosion protection, UV resistance for outdoor equipment." },
  { id: 9, question: "Earthing and bonding specifications should define:", options: ["Only earth rod depth", "Conductor sizes, connection methods, and identification requirements", "Nothing specific", "Only green/yellow sleeving"], correctAnswer: 1, explanation: "Earthing specifications include: conductor sizes (main earthing conductor, bonding conductors), connection methods (clamps, crimps), labelling requirements, and routing/protection." },
  { id: 10, question: "Specifications for special locations should reference:", options: ["No additional requirements", "Relevant BS 7671 Part 7 sections (e.g., 701 for bathrooms)", "Only general requirements", "Foreign standards"], correctAnswer: 1, explanation: "Special locations have specific requirements in BS 7671 Part 7. Specifications should reference the relevant sections - e.g., Section 701 for bathrooms, Section 711 for exhibitions." },
  { id: 11, question: "A well-written specification helps to:", options: ["Create confusion", "Ensure consistent quality, enable accurate pricing, and define acceptance criteria", "Avoid documentation", "Increase disputes"], correctAnswer: 1, explanation: "Good specifications enable: accurate contractor pricing, consistent quality standards, clear acceptance criteria, proper material procurement, and reduced disputes over requirements." },
  { id: 12, question: "Labelling and identification requirements in specifications should include:", options: ["No requirements", "Distribution board schedules, cable identification, and warning labels", "Only circuit numbers", "Just contractor logos"], correctAnswer: 1, explanation: "Identification specifications cover: distribution board schedules, cable/circuit identification methods, warning and safety labels, equipment nameplates, and as-installed documentation." }
];

const faqs = [
  { question: "Who writes installation specifications?", answer: "Specifications are typically written by the designer or consulting engineer. On smaller projects, the contractor may develop specifications based on client requirements. The person certifying the work should verify the specification meets BS 7671." },
  { question: "What's the difference between a specification and a design?", answer: "Design documents show what the installation will comprise (calculations, drawings, schedules). Specifications describe how it should be built - the materials, standards, and quality requirements. Both work together to fully define the installation." },
  { question: "How detailed should specifications be?", answer: "Detailed enough to ensure quality and consistency without being unnecessarily prescriptive. Specify performance requirements where possible, allowing contractor flexibility in methods. Be specific about safety-critical items and compliance requirements." },
  { question: "Can specifications reference other documents?", answer: "Yes, specifications commonly reference: BS 7671, other British Standards, manufacturer installation guides, CIBSE guidance, Building Regulations, and industry codes of practice. Referenced documents become part of the specification requirements." },
  { question: "How do I handle specification deviations during installation?", answer: "Specifications should include a variation procedure. Any deviation from specification should be formally submitted, technically evaluated, and approved before implementation. Changes should be documented in as-built records." }
];

const Level3Module6Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section6"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Define materials, standards, quality</li>
              <li><strong>Reference:</strong> BS 7671 as minimum standard</li>
              <li><strong>Include:</strong> Testing, certification, documentation</li>
              <li><strong>Result:</strong> Consistent quality installations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Detailed contract documents</li>
              <li><strong>Use:</strong> Define project requirements</li>
              <li><strong>Quality:</strong> Basis for acceptance criteria</li>
            </ul>
          </div>
        </div>

        

        

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">01</span>Specification Fundamentals</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Installation specifications define the requirements for materials, workmanship, testing, and documentation. They complement design drawings and schedules to provide a complete description of what is required.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Specification Sections:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Section</th><th className="border border-white/10 px-2 py-1 text-left">Content</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Scope</td><td className="border border-white/10 px-2 py-1">Description of work included and excluded</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Standards</td><td className="border border-white/10 px-2 py-1">Reference standards (BS 7671, etc.)</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Materials</td><td className="border border-white/10 px-2 py-1">Equipment and material requirements</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Workmanship</td><td className="border border-white/10 px-2 py-1">Installation practices and quality</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Testing</td><td className="border border-white/10 px-2 py-1">Test requirements and acceptance criteria</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Documentation</td><td className="border border-white/10 px-2 py-1">Required certificates and records</td></tr>
                </tbody>
              </table>
            </div>
            <p>Well-written specifications reduce disputes, ensure quality, and provide clear criteria for work acceptance.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[0]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">02</span>Material Specifications</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Material specifications define quality requirements for all equipment and components. They should be specific enough to ensure suitability while allowing competitive alternatives.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Material Specification Elements:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Element</th><th className="border border-white/10 px-2 py-1 text-left">Example Requirement</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Type</td><td className="border border-white/10 px-2 py-1">XLPE/SWA cable, Type B MCB</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Standards</td><td className="border border-white/10 px-2 py-1">Manufactured to BS EN 61439</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Certification</td><td className="border border-white/10 px-2 py-1">CE/UKCA marked, BSI Kitemarked</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Performance</td><td className="border border-white/10 px-2 py-1">IP65 rating, 10kA breaking capacity</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Approval</td><td className="border border-white/10 px-2 py-1">Submit data sheets for approval</td></tr>
                </tbody>
              </table>
            </div>
            <p>Use "or approved equivalent" to allow alternatives while maintaining standards. Define the approval process for substitutions.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[1]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">03</span>Workmanship Standards</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Workmanship specifications define how installation work should be carried out. They cover practices that affect both safety and quality.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Workmanship Requirements:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Area</th><th className="border border-white/10 px-2 py-1 text-left">Typical Requirements</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Cable installation</td><td className="border border-white/10 px-2 py-1">Bend radii, fixing centres, protection</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Terminations</td><td className="border border-white/10 px-2 py-1">Correct tools, torque settings, crimping</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Containment</td><td className="border border-white/10 px-2 py-1">Joint methods, fill ratios, fire stopping</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Equipment mounting</td><td className="border border-white/10 px-2 py-1">Access clearances, ventilation, labelling</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Identification</td><td className="border border-white/10 px-2 py-1">Cable marking, circuit labelling, warning notices</td></tr>
                </tbody>
              </table>
            </div>
            <p>Reference manufacturer installation instructions and industry good practice guides. IET publications provide valuable guidance on installation practices.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[2]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">04</span>Testing and Certification</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Testing specifications define what tests are required, acceptance criteria, and documentation. They ensure the installation is verified as safe before energisation.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Testing Specification Content:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Requirement</th><th className="border border-white/10 px-2 py-1 text-left">Detail</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Test standard</td><td className="border border-white/10 px-2 py-1">BS 7671 Part 6, GN3</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Required tests</td><td className="border border-white/10 px-2 py-1">Continuity, IR, EFLI, polarity, RCD</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Acceptance criteria</td><td className="border border-white/10 px-2 py-1">Zs within Table 41.3 limits</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Documentation</td><td className="border border-white/10 px-2 py-1">EIC, schedule of test results</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Certification</td><td className="border border-white/10 px-2 py-1">Issued by competent person</td></tr>
                </tbody>
              </table>
            </div>
            <p>Specify that testing must be carried out by a competent person and that all results must be recorded on the appropriate BS 7671 model forms.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[3]]} className="my-8" />

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/30 text-sm text-white space-y-2">
            <p><strong>Writing effective specifications:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Be clear and unambiguous - avoid vague terms like "suitable" without definition</li>
              <li>Use "shall" for mandatory requirements, "should" for recommendations</li>
              <li>Reference standards by number and title (e.g., "BS 7671:2018+A2:2022")</li>
              <li>Include a definitions section for technical terms</li>
              <li>Coordinate with drawings and schedules to avoid conflicts</li>
            </ul>
            <p className="mt-3"><strong>Common specification items:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Distribution boards: type, rating, ways, IP rating, manufacturer</li>
              <li>Cables: type, conductor, insulation, armour, fire rating</li>
              <li>Containment: type, size, material, fire rating, fixings</li>
              <li>Protective devices: type, rating, characteristics, coordination</li>
              <li>Accessories: type, finish, IP rating, mounting method</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Reference</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Key Standards to Reference</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">Wiring regulations</td><td className="py-1 text-white">BS 7671</td></tr>
                  <tr><td className="py-1 text-white/70">Distribution boards</td><td className="py-1 text-white">BS EN 61439</td></tr>
                  <tr><td className="py-1 text-white/70">Cables</td><td className="py-1 text-white">BS 5467, BS 6724, BS 7211</td></tr>
                  <tr><td className="py-1 text-white/70">Fire detection</td><td className="py-1 text-white">BS 5839</td></tr>
                  <tr><td className="py-1 text-white/70">Emergency lighting</td><td className="py-1 text-white">BS 5266</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Documentation Checklist</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">Certificates</td><td className="py-1 text-white">EIC, MEIWC as appropriate</td></tr>
                  <tr><td className="py-1 text-white/70">Test results</td><td className="py-1 text-white">Schedule of test results</td></tr>
                  <tr><td className="py-1 text-white/70">Drawings</td><td className="py-1 text-white">As-built drawings</td></tr>
                  <tr><td className="py-1 text-white/70">Schedules</td><td className="py-1 text-white">Circuit schedules updated</td></tr>
                  <tr><td className="py-1 text-white/70">Manuals</td><td className="py-1 text-white">O&M documentation</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Quiz questions={quizQuestions} />

        <section className="mt-12 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group p-3 rounded-lg bg-white/5 text-sm">
                <summary className="cursor-pointer text-white font-medium">{faq.question}</summary>
                <p className="mt-2 text-white/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <nav className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section6-1"><ArrowLeft className="w-4 h-4 mr-2" />Previous: Design Documentation</Link>
          </Button>
          <Button className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section6-3">Next: Bill of Quantities<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section6_2;
