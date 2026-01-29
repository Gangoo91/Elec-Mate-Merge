import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Environmental and Building Regulations - HNC Module 1 Section 1.6";
const DESCRIPTION = "Master UK environmental legislation and building regulations for building services: Environmental Protection Act 1990, Part P, F-gas regulations, WEEE, and building control requirements.";

const quickCheckQuestions = [
  {
    id: "part-p-scope",
    question: "Which type of electrical work is NOT covered by Part P Building Regulations?",
    options: ["New circuit in a kitchen", "Like-for-like socket replacement", "Bathroom electrical installation", "New consumer unit installation"],
    correctIndex: 1,
    explanation: "Like-for-like replacement of accessories (sockets, switches, light fittings) is minor work not covered by Part P. However, adding new circuits, work in special locations (bathrooms, kitchens), and consumer unit changes all require notification."
  },
  {
    id: "f-gas-qual",
    question: "What minimum qualification is required to handle F-gas refrigerants?",
    options: ["City & Guilds 2391", "F-gas Category I-IV certificate", "BS 7671 certification", "CSCS card only"],
    correctIndex: 1,
    explanation: "F-gas Regulation (EU 517/2014, retained in UK law) requires personnel handling fluorinated refrigerants to hold an appropriate Category I-IV certificate depending on the work undertaken. This is a legal requirement."
  },
  {
    id: "weee-responsibility",
    question: "Under WEEE Regulations, who is primarily responsible for proper disposal of commercial electrical equipment?",
    options: ["The manufacturer only", "The local council", "The business owner/last holder", "The installation contractor"],
    correctIndex: 2,
    explanation: "Under WEEE Regulations 2013, the 'holder' (typically the business owner) is responsible for ensuring waste electrical equipment is properly disposed of through an approved AATF (Approved Authorised Treatment Facility)."
  },
  {
    id: "building-control-notify",
    question: "Within what timeframe must notifiable electrical work be registered with Building Control?",
    options: ["Within 5 working days", "Within 30 days of completion", "Before work commences", "Within 24 hours"],
    correctIndex: 1,
    explanation: "When using a competent person scheme (such as NICEIC or NAPIT), notification must be made within 30 days of completion. If not registered with such a scheme, Building Control must be notified BEFORE work commences."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of the Environmental Protection Act 1990?",
    options: [
      "To regulate electrical installations only",
      "To control emissions, waste management, and environmental contamination",
      "To enforce building regulations",
      "To manage refrigerant gases"
    ],
    correctAnswer: 1,
    explanation: "The Environmental Protection Act 1990 is the principal legislation for environmental protection in the UK, covering waste management, contaminated land, statutory nuisances, and integrated pollution control."
  },
  {
    id: 2,
    question: "Which Part of the Building Regulations specifically deals with electrical safety in dwellings?",
    options: ["Part A", "Part L", "Part P", "Part M"],
    correctAnswer: 2,
    explanation: "Part P (Electrical Safety - Dwellings) covers electrical installations in dwellings. Part A deals with structure, Part L with energy conservation, and Part M with access."
  },
  {
    id: 3,
    question: "What does the 'duty of care' under EPA 1990 require of contractors handling waste?",
    options: [
      "Simply placing waste in any skip",
      "Ensuring waste is transferred only to authorised persons with correct documentation",
      "Burning waste on site",
      "Disposing of waste in council bins"
    ],
    correctAnswer: 1,
    explanation: "The duty of care requires anyone handling waste to ensure it is only transferred to authorised carriers, with proper waste transfer notes describing the waste. This chain of responsibility applies from production to final disposal."
  },
  {
    id: 4,
    question: "When installing a new circuit for an electric shower in a bathroom, what Building Control action is required?",
    options: [
      "No action needed - bathrooms are exempt",
      "Notification to Building Control or registration via competent person scheme",
      "Only a Part L certificate is needed",
      "The homeowner self-certifies"
    ],
    correctAnswer: 1,
    explanation: "New circuits in bathrooms (special locations) are notifiable work under Part P. Either notify Building Control before work starts, or self-certify through a competent person scheme (NICEIC, NAPIT, etc.) within 30 days of completion."
  },
  {
    id: 5,
    question: "What is the Global Warming Potential (GWP) threshold for F-gases that will be phased out under UK regulations?",
    options: [
      "GWP above 150",
      "GWP above 750",
      "GWP above 2500",
      "There is no GWP threshold"
    ],
    correctAnswer: 2,
    explanation: "The F-gas Regulation sets a phase-down schedule with bans on high-GWP refrigerants. From 2025, new equipment using refrigerants with GWP above 2500 (like R404A) is prohibited. Lower GWP alternatives such as R32 and R290 are encouraged."
  },
  {
    id: 6,
    question: "Under WEEE Regulations, what is an AATF?",
    options: [
      "Approved Authorised Treatment Facility",
      "Automated Assembly Test Facility",
      "Alternative Appliance Transfer Form",
      "Annual Audit and Testing Framework"
    ],
    correctAnswer: 0,
    explanation: "An AATF (Approved Authorised Treatment Facility) is a licensed facility for processing waste electrical and electronic equipment. WEEE must be taken to an AATF to ensure proper recycling and recovery of hazardous materials."
  },
  {
    id: 7,
    question: "Which certificate must be issued upon completion of notifiable electrical work in a dwelling?",
    options: [
      "Part P Certificate only",
      "Building Regulations Compliance Certificate from Building Control",
      "Electrical Installation Certificate AND Building Regulations Compliance Certificate",
      "Minor Works Certificate only"
    ],
    correctAnswer: 2,
    explanation: "Notifiable electrical work requires both an Electrical Installation Certificate (to BS 7671) AND a Building Regulations Compliance Certificate (from Building Control or the competent person scheme). Both documents should be given to the property owner."
  },
  {
    id: 8,
    question: "What type of waste would old fluorescent tubes containing mercury be classified as?",
    options: [
      "General waste",
      "Recyclable waste",
      "Hazardous waste requiring special disposal",
      "Compostable waste"
    ],
    correctAnswer: 2,
    explanation: "Fluorescent tubes contain mercury and phosphor powder, classifying them as hazardous waste under the Hazardous Waste Regulations 2005. They require specialist collection and disposal through licensed facilities, not general waste streams."
  },
  {
    id: 9,
    question: "Which competent person scheme allows electricians to self-certify Part P notifiable work?",
    options: [
      "Gas Safe Register",
      "NICEIC, NAPIT, or equivalent electrical scheme",
      "CHAS only",
      "Construction Skills Certification Scheme"
    ],
    correctAnswer: 1,
    explanation: "Competent person schemes like NICEIC, NAPIT, ELECSA, and others allow registered electricians to self-certify notifiable electrical work and issue Building Regulations Compliance Certificates without involving Local Authority Building Control directly."
  },
  {
    id: 10,
    question: "What is the maximum penalty for illegal dumping (fly-tipping) under the EPA 1990?",
    options: [
      "£500 fixed penalty",
      "£50,000 fine only",
      "Unlimited fine and/or up to 5 years imprisonment",
      "Community service only"
    ],
    correctAnswer: 2,
    explanation: "Fly-tipping is a serious criminal offence under EPA 1990. On conviction, individuals face unlimited fines and/or up to 5 years imprisonment. Fixed penalty notices of up to £1000 may be issued for minor offences, but serious cases go to court."
  },
  {
    id: 11,
    question: "What document must accompany waste when transferred to a licensed carrier?",
    options: [
      "Insurance certificate",
      "Waste Transfer Note or Consignment Note",
      "Risk assessment",
      "Method statement"
    ],
    correctAnswer: 1,
    explanation: "A Waste Transfer Note (for non-hazardous waste) or Consignment Note (for hazardous waste) must accompany all waste transfers. These documents must be retained for 2 years (WTN) or 3 years (CN) and describe the waste, its origin, and the receiving party."
  },
  {
    id: 12,
    question: "Under Part L Building Regulations, what must be considered when upgrading building services?",
    options: [
      "Only structural integrity",
      "Energy efficiency and carbon emissions targets",
      "Paint colours only",
      "Furniture layout"
    ],
    correctAnswer: 1,
    explanation: "Part L (Conservation of Fuel and Power) requires building services upgrades to meet minimum energy efficiency standards. This includes consideration of lighting efficacy, HVAC efficiency, controls, and insulation to reduce carbon emissions."
  }
];

const faqs = [
  {
    question: "Do I need to register with a competent person scheme to do electrical work?",
    answer: "Not legally required, but highly recommended. Without scheme membership (NICEIC, NAPIT, ELECSA, etc.), you must notify Building Control BEFORE starting any notifiable work, pay their inspection fees, and wait for their availability. Scheme members can self-certify, making the process faster and more cost-effective for clients."
  },
  {
    question: "What happens if I don't notify Building Control about notifiable electrical work?",
    answer: "Failure to notify is a criminal offence under the Building Act 1984. The local authority can require you to expose and test the work, or even remove it. More practically, non-notified work causes problems when selling a property - solicitors require compliance certificates, and retrospective regularisation is expensive (typically £200-£500)."
  },
  {
    question: "How do I dispose of old refrigeration equipment containing F-gases?",
    answer: "F-gas equipment must be decommissioned by qualified personnel who recover the refrigerant using certified equipment. The recovered gas must be sent for destruction, recycling, or reclamation by an approved company. The equipment itself falls under WEEE regulations and should go to an AATF. Keep recovery certificates for audit purposes."
  },
  {
    question: "What training is needed for working with hazardous waste?",
    answer: "Personnel handling hazardous waste should receive training appropriate to their role. This includes understanding waste classification, segregation, storage requirements, and documentation. For specific materials like asbestos, specialist qualifications (UKATA/IATP accredited training) are legally required. Regular refresher training is essential."
  },
  {
    question: "Are there exemptions from Part P for any electrical work?",
    answer: "Yes, minor works such as like-for-like replacement of accessories, adding a fused spur from an existing circuit (outside special locations), and repairs do not require notification. However, all work must still comply with BS 7671. Work in special locations (bathrooms, swimming pools, saunas) and new circuits always require notification."
  }
];

const HNCModule1Section1_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.1.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Environmental and Building Regulations
          </h1>
          <p className="text-white/80">
            Essential UK legislation governing environmental protection, electrical installations, and building services compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>EPA 1990:</strong> Controls waste, pollution, and environmental contamination</li>
              <li className="pl-1"><strong>Part P:</strong> Electrical safety in dwellings - notification required</li>
              <li className="pl-1"><strong>F-gas:</strong> Refrigerant handling requires certified personnel</li>
              <li className="pl-1"><strong>WEEE:</strong> Proper disposal of electrical equipment</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Waste duty of care:</strong> All construction waste properly managed</li>
              <li className="pl-1"><strong>Competent person schemes:</strong> NICEIC, NAPIT self-certification</li>
              <li className="pl-1"><strong>Part L:</strong> Energy efficiency requirements</li>
              <li className="pl-1"><strong>Hazardous waste:</strong> Specialist disposal requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the scope and requirements of the Environmental Protection Act 1990",
              "Identify notifiable work under Part P Building Regulations",
              "Describe the Building Control notification process and competent person schemes",
              "Outline F-gas Regulation requirements for refrigerant handling",
              "Apply WEEE and hazardous waste disposal requirements",
              "Understand compliance pathways for building services installations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Environmental Protection Act 1990 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Environmental Protection Act 1990
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Environmental Protection Act 1990 (EPA 1990) is the cornerstone of UK environmental legislation.
              For building services professionals, understanding its requirements is essential for legal compliance
              and professional practice.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key provisions affecting building services:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Part I:</strong> Integrated Pollution Control - controls emissions from industrial processes</li>
                <li className="pl-1"><strong>Part II:</strong> Waste management licensing and duty of care</li>
                <li className="pl-1"><strong>Part III:</strong> Statutory nuisances - noise, dust, odours from construction</li>
                <li className="pl-1"><strong>Part IIA:</strong> Contaminated land identification and remediation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Duty of Care (Section 34)</p>
              <p className="text-sm text-white mb-3">
                The duty of care applies to anyone who produces, imports, carries, keeps, treats, or disposes of
                controlled waste. As a building services contractor, you must:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Evidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Prevent escape</td>
                      <td className="border border-white/10 px-3 py-2">Store waste securely on site</td>
                      <td className="border border-white/10 px-3 py-2">Covered skips, locked compounds</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transfer to authorised person</td>
                      <td className="border border-white/10 px-3 py-2">Check carrier's licence</td>
                      <td className="border border-white/10 px-3 py-2">Carrier registration number</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Describe waste accurately</td>
                      <td className="border border-white/10 px-3 py-2">Complete transfer documentation</td>
                      <td className="border border-white/10 px-3 py-2">Waste Transfer Notes (2 years)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Prevent illegal disposal</td>
                      <td className="border border-white/10 px-3 py-2">Verify final destination</td>
                      <td className="border border-white/10 px-3 py-2">Licensed facility confirmation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Enforcement and Penalties</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fly-tipping:</strong> Unlimited fine and/or up to 5 years imprisonment</li>
                <li className="pl-1"><strong>Duty of care breach:</strong> Unlimited fine on indictment</li>
                <li className="pl-1"><strong>Fixed penalty:</strong> Up to £1000 for minor offences</li>
                <li className="pl-1"><strong>Vehicle seizure:</strong> Powers to seize vehicles used for illegal waste activity</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The duty of care follows waste from 'cradle to grave' - you remain liable for waste you produce even after transfer.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 2: Part P Building Regulations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Part P Building Regulations - Electrical Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part P of the Building Regulations (England and Wales) sets requirements for electrical
              installations in dwellings to ensure they are designed and installed safely. It applies
              to houses, flats, maisonettes, and their gardens and outbuildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Notifiable Work - Requires Building Control</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Always notifiable:</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">New circuit installations</li>
                    <li className="pl-1">Consumer unit replacement/alterations</li>
                    <li className="pl-1">Any work in special locations (bathrooms, swimming pools)</li>
                    <li className="pl-1">Outdoor installations</li>
                    <li className="pl-1">Work near the origin of the installation</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Non-notifiable (minor works):</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Like-for-like replacement of accessories</li>
                    <li className="pl-1">Adding lighting points to existing circuits</li>
                    <li className="pl-1">Adding sockets/FCUs from existing circuits (not in special locations)</li>
                    <li className="pl-1">Repairs and maintenance</li>
                    <li className="pl-1">Prefabricated equipment connection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Special Locations Under Part P</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Bathrooms:</strong> Any electrical work (except SELV systems) requires notification</li>
                <li className="pl-1"><strong>Kitchens:</strong> New circuits require notification, but adding sockets to existing circuits does not</li>
                <li className="pl-1"><strong>Swimming pools/saunas:</strong> All electrical work is notifiable</li>
                <li className="pl-1"><strong>Gardens/outbuildings:</strong> New circuits always notifiable</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Routes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Route</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Process</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Certification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Competent Person Scheme</td>
                      <td className="border border-white/10 px-3 py-2">Self-certify and notify scheme within 30 days</td>
                      <td className="border border-white/10 px-3 py-2">EIC + Building Regs Compliance Cert</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building Control</td>
                      <td className="border border-white/10 px-3 py-2">Notify LA before work, arrange inspections</td>
                      <td className="border border-white/10 px-3 py-2">EIC + LA Completion Certificate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Third Party Certification</td>
                      <td className="border border-white/10 px-3 py-2">Engage registered third party certifier</td>
                      <td className="border border-white/10 px-3 py-2">EIC + Third Party Certificate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Competent Person Schemes</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-2 rounded bg-white/5">NICEIC</div>
                <div className="p-2 rounded bg-white/5">NAPIT</div>
                <div className="p-2 rounded bg-white/5">ELECSA</div>
                <div className="p-2 rounded bg-white/5">STROMA</div>
              </div>
              <p className="text-xs text-white/70 mt-2">
                Scheme members must meet competence criteria, maintain technical competence, and are subject to periodic assessment.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Part P applies to England and Wales only. Scotland uses Building Standards, and Northern Ireland has its own Building Regulations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: F-gas Regulations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            F-gas Regulations - Refrigerant Handling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The F-gas Regulation (EU 517/2014, retained in UK law) controls the use of fluorinated greenhouse
              gases (HFCs, PFCs, SF6) to combat climate change. For building services, this primarily affects
              air conditioning, refrigeration, and heat pump installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key requirements for building services:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Personnel must hold appropriate certification (Categories I-IV)</li>
                <li className="pl-1">Refrigerant must be recovered during servicing and at end of life</li>
                <li className="pl-1">Leak checking requirements based on CO2-equivalent charge</li>
                <li className="pl-1">Records must be kept of refrigerant quantities and leak checks</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">F-gas Certification Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scope of Work</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Category I</td>
                      <td className="border border-white/10 px-3 py-2">All activities - no charge limit</td>
                      <td className="border border-white/10 px-3 py-2">Commercial HVAC contractors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Category II</td>
                      <td className="border border-white/10 px-3 py-2">Recovery from equipment &lt;3kg charge</td>
                      <td className="border border-white/10 px-3 py-2">Small systems, domestic AC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Category III</td>
                      <td className="border border-white/10 px-3 py-2">Recovery from equipment &lt;3kg (hermetic)</td>
                      <td className="border border-white/10 px-3 py-2">Domestic refrigeration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Category IV</td>
                      <td className="border border-white/10 px-3 py-2">Leak checking only</td>
                      <td className="border border-white/10 px-3 py-2">Maintenance staff, inspectors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Leak Checking Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">CO2-equivalent Charge</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Check Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt;5 tonnes CO2e</td>
                      <td className="border border-white/10 px-3 py-2">Not required</td>
                      <td className="border border-white/10 px-3 py-2">Good practice to check</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5-50 tonnes CO2e</td>
                      <td className="border border-white/10 px-3 py-2">Every 12 months</td>
                      <td className="border border-white/10 px-3 py-2">Every 24 months with leak detection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50-500 tonnes CO2e</td>
                      <td className="border border-white/10 px-3 py-2">Every 6 months</td>
                      <td className="border border-white/10 px-3 py-2">Every 12 months with leak detection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;500 tonnes CO2e</td>
                      <td className="border border-white/10 px-3 py-2">Every 3 months</td>
                      <td className="border border-white/10 px-3 py-2">Leak detection mandatory</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Refrigerants and GWP</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-red-500/10">
                  <p className="font-bold mb-1">R404A</p>
                  <p className="text-xs text-white/70">GWP: 3922</p>
                  <p className="text-xs text-red-400">Phase out</p>
                </div>
                <div className="p-3 rounded bg-orange-500/10">
                  <p className="font-bold mb-1">R410A</p>
                  <p className="text-xs text-white/70">GWP: 2088</p>
                  <p className="text-xs text-orange-400">Restricted</p>
                </div>
                <div className="p-3 rounded bg-green-500/10">
                  <p className="font-bold mb-1">R32</p>
                  <p className="text-xs text-white/70">GWP: 675</p>
                  <p className="text-xs text-green-400">Alternative</p>
                </div>
                <div className="p-3 rounded bg-green-500/10">
                  <p className="font-bold mb-1">R290</p>
                  <p className="text-xs text-white/70">GWP: 3</p>
                  <p className="text-xs text-green-400">Natural</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Trend:</strong> The industry is moving to lower-GWP alternatives. R32 is increasingly common for new split AC systems, while natural refrigerants (R290 propane, R744 CO2) are used in supermarket refrigeration.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Waste Regulations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Waste Regulations - WEEE and Hazardous Waste
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building services work generates significant waste, from replaced equipment to packaging and
              construction materials. Proper classification and disposal is both a legal requirement and
              professional responsibility.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">WEEE Regulations 2013</p>
              <p className="text-sm text-white mb-3">
                The Waste Electrical and Electronic Equipment Regulations require proper disposal of
                electrical equipment through approved treatment facilities. This applies to equipment
                removed during upgrade or replacement work.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Producer responsibility:</strong> Manufacturers must finance collection and treatment</li>
                <li className="pl-1"><strong>Distributor take-back:</strong> Retailers must accept old equipment on like-for-like basis</li>
                <li className="pl-1"><strong>Holder responsibility:</strong> Business users must arrange proper disposal</li>
                <li className="pl-1"><strong>AATF:</strong> All WEEE must go to Approved Authorised Treatment Facilities</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Building Services WEEE</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Hazardous Components</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Disposal Route</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fluorescent tubes</td>
                      <td className="border border-white/10 px-3 py-2">Mercury, phosphor powder</td>
                      <td className="border border-white/10 px-3 py-2">Hazardous waste collection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air conditioning units</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant, oil</td>
                      <td className="border border-white/10 px-3 py-2">F-gas recovery + AATF</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control panels</td>
                      <td className="border border-white/10 px-3 py-2">Batteries, capacitors</td>
                      <td className="border border-white/10 px-3 py-2">AATF for WEEE</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Older thermostats</td>
                      <td className="border border-white/10 px-3 py-2">Mercury switches</td>
                      <td className="border border-white/10 px-3 py-2">Hazardous waste collection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UPS systems</td>
                      <td className="border border-white/10 px-3 py-2">Lead-acid batteries</td>
                      <td className="border border-white/10 px-3 py-2">Battery recycler + AATF</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hazardous Waste Regulations 2005</p>
              <p className="text-sm text-white mb-3">
                Hazardous waste requires additional controls, documentation, and specialist disposal routes.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Common hazardous wastes:</p>
                  <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                    <li>Fluorescent tubes (mercury)</li>
                    <li>Lead-acid batteries</li>
                    <li>Transformer oil (PCBs)</li>
                    <li>Refrigerant gases</li>
                    <li>Asbestos-containing materials</li>
                    <li>Contaminated PPE/materials</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Requirements:</p>
                  <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                    <li>Consignment notes (not WTN)</li>
                    <li>Premises registration (if producing &gt;500kg/year)</li>
                    <li>Records kept for 3 years</li>
                    <li>Licensed hazardous waste carrier</li>
                    <li>Proper segregation on site</li>
                    <li>Correct waste codes (EWC)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Waste Documentation Summary</p>
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-medium text-white mb-1">Waste Transfer Note (WTN)</p>
                  <ul className="text-white/70 space-y-0.5">
                    <li>- Non-hazardous waste</li>
                    <li>- Retain for 2 years</li>
                    <li>- Both parties sign</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Consignment Note (CN)</p>
                  <ul className="text-white/70 space-y-0.5">
                    <li>- Hazardous waste only</li>
                    <li>- Retain for 3 years</li>
                    <li>- Unique reference number</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Best practice:</strong> Establish relationships with reputable waste carriers and treatment facilities. Keep a waste management plan for each project identifying expected waste streams and disposal routes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Additional Regulations Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Additional Building Regulations</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part L - Conservation of Fuel and Power</h3>
              <p className="text-sm text-white mb-2">
                Part L sets energy efficiency requirements for building services installations:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lighting:</strong> Minimum efficacy requirements, controls for presence and daylight</li>
                <li className="pl-1"><strong>HVAC:</strong> Minimum efficiency standards, metering requirements</li>
                <li className="pl-1"><strong>Building fabric:</strong> Insulation, air tightness, thermal bridging</li>
                <li className="pl-1"><strong>Commissioning:</strong> Systems must be commissioned to achieve design performance</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part F - Ventilation</h3>
              <p className="text-sm text-white mb-2">
                Requirements for ventilation systems in buildings:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Minimum ventilation rates for different room types</li>
                <li className="pl-1">Extract requirements for kitchens, bathrooms, WCs</li>
                <li className="pl-1">Background ventilation provisions</li>
                <li className="pl-1">Commissioning and handover documentation</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part B - Fire Safety</h3>
              <p className="text-sm text-white mb-2">
                Fire safety requirements affecting building services:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fire detection:</strong> Smoke/heat detector requirements and grades</li>
                <li className="pl-1"><strong>Emergency lighting:</strong> Coverage, duration, and testing</li>
                <li className="pl-1"><strong>Fire barriers:</strong> Maintaining compartmentation for cable routes</li>
                <li className="pl-1"><strong>Smoke control:</strong> Mechanical and natural ventilation systems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Compliance Checklist</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Starting Work</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify if work is notifiable under Part P</li>
                <li className="pl-1">Check for other relevant Building Regulations (Part L, F, B)</li>
                <li className="pl-1">Establish waste streams and disposal routes</li>
                <li className="pl-1">Verify personnel hold required certifications (F-gas if applicable)</li>
                <li className="pl-1">Notify Building Control or competent person scheme as required</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Installation</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Segregate waste streams on site</li>
                <li className="pl-1">Store hazardous materials securely</li>
                <li className="pl-1">Keep waste transfer notes for all collections</li>
                <li className="pl-1">Document refrigerant quantities if applicable</li>
                <li className="pl-1">Comply with BS 7671 throughout</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">On Completion</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Complete Electrical Installation Certificate</li>
                <li className="pl-1">Notify competent person scheme within 30 days</li>
                <li className="pl-1">Obtain Building Regulations Compliance Certificate</li>
                <li className="pl-1">Provide all documentation to property owner</li>
                <li className="pl-1">Retain copies for minimum 6 years</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Failures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting notification:</strong> Bathroom work is always notifiable</li>
                <li className="pl-1"><strong>Missing documentation:</strong> No EIC provided to customer</li>
                <li className="pl-1"><strong>Improper waste disposal:</strong> Fluorescent tubes in general skip</li>
                <li className="pl-1"><strong>F-gas non-compliance:</strong> No leak checking records</li>
                <li className="pl-1"><strong>Consumer unit changes:</strong> Assuming like-for-like exempt</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>EPA 1990 - Environmental protection</li>
                  <li>Building Regs Part P - Electrical safety</li>
                  <li>F-gas Regulation - Refrigerants</li>
                  <li>WEEE Regs 2013 - Electrical waste</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Document Retention</p>
                <ul className="space-y-0.5">
                  <li>Waste Transfer Notes: 2 years</li>
                  <li>Consignment Notes: 3 years</li>
                  <li>F-gas records: 5 years</li>
                  <li>Electrical certificates: 6 years</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section1-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 1.5
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2">
              Next: Section 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section1_6;
