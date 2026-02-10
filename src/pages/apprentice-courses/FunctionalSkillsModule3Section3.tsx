import { ArrowLeft, ArrowRight, Smartphone, FileCheck, FileText, Camera, PenTool, ClipboardList, Building2, TrendingUp } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule3Section3 = () => {
  useSEO(
    "Section 3: Digital Documentation & Apps - Digital Skills for Electricians",
    "Explore certification software, PDF annotation, photo documentation, digital signatures, project management apps, BIM, electrical design software, and staying current with technology."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "Which of the following is a popular electrical certification app used by UK electricians?",
      options: [
        "Instagram",
        "Certsure / NICEIC Certification Portal",
        "Spotify",
        "TikTok"
      ],
      correctAnswer: 1,
      explanation: "Certsure (the parent company of NICEIC and ELECSA) provides a digital certification portal that allows registered electricians to create, manage, and submit electrical certificates electronically. iCertifi is another popular option. These purpose-built apps replace handwritten paper certificates with professional digital documents."
    },
    {
      id: 2,
      question: "When annotating a PDF of a wiring diagram on site, which tool would you most commonly use?",
      options: [
        "A paintbrush tool for artistic effects",
        "A highlighter and text comment tool to mark areas needing attention",
        "A music embedding tool",
        "A video recording tool"
      ],
      correctAnswer: 1,
      explanation: "Highlighter and text comment tools are the most practical for annotating wiring diagrams and electrical drawings. You can highlight areas of concern, add text notes about observations or required changes, and draw attention to specific circuits. These annotations can be shared with colleagues and clients as part of your documentation."
    },
    {
      id: 3,
      question: "What metadata should you ensure is enabled on site photographs taken for compliance documentation?",
      options: [
        "Instagram filters",
        "Date, time, and GPS location stamps",
        "Artistic borders",
        "Background music"
      ],
      correctAnswer: 1,
      explanation: "Date, time, and GPS location metadata embedded in photographs provides verifiable evidence of when and where the photo was taken. This is crucial for compliance documentation — it proves you were on site at the recorded time and that the photograph accurately represents the installation at that specific point in the project."
    },
    {
      id: 4,
      question: "What is the primary purpose of Building Information Modelling (BIM) in electrical work?",
      options: [
        "Creating marketing materials for your business",
        "A 3D digital representation of a building's physical and functional characteristics, including electrical systems",
        "Editing holiday photographs",
        "Playing simulation games"
      ],
      correctAnswer: 1,
      explanation: "BIM creates a detailed 3D digital model of a building that includes all systems — structural, mechanical, electrical, and plumbing. For electricians, BIM allows you to see exactly where cables, containment, distribution boards, and outlets are positioned relative to other building elements, reducing clashes and rework on site."
    },
    {
      id: 5,
      question: "Which feature makes digital signatures legally valid in the UK?",
      options: [
        "They must be written in blue ink",
        "They comply with the Electronic Communications Act 2000 and eIDAS regulations",
        "They must include a photograph of the signer",
        "They are only valid if printed on paper"
      ],
      correctAnswer: 1,
      explanation: "Digital signatures are legally valid in the UK under the Electronic Communications Act 2000 and the EU eIDAS regulation (retained in UK law). Qualified electronic signatures have the same legal standing as handwritten signatures. Services like DocuSign and Adobe Sign provide audit trails that make digital signatures even more verifiable than handwritten ones."
    },
    {
      id: 6,
      question: "What is the main advantage of using a project management app like Trello or Monday.com for electrical projects?",
      options: [
        "It replaces the need for electrical qualifications",
        "It provides visibility of task progress, deadlines, and team responsibilities in one place",
        "It automatically completes electrical calculations",
        "It generates electrical certificates"
      ],
      correctAnswer: 1,
      explanation: "Project management apps centralise all project information — tasks, deadlines, assigned team members, progress status, and file attachments — in a single accessible location. This visibility prevents tasks from being forgotten, enables better coordination between team members, and provides clients with progress updates."
    },
    {
      id: 7,
      question: "When taking site photographs for documentation, what framing technique ensures the photo is useful?",
      options: [
        "Always use portrait mode with artistic blur",
        "Take a wide establishing shot first, then close-up detail shots with identifiable reference points",
        "Only photograph in black and white for a professional look",
        "Use the maximum zoom at all times"
      ],
      correctAnswer: 1,
      explanation: "Professional documentation photography follows a systematic approach: start with a wide establishing shot that shows the location context (which room, where on the wall), then take progressively closer shots showing specific details. Include reference points (cable labels, circuit numbers, adjacent fittings) so the photograph can be understood without additional context."
    },
    {
      id: 8,
      question: "Which electrical design software is commonly used by UK electrical engineers and designers?",
      options: [
        "Microsoft Paint",
        "Amtech ProDesign or Trimble ID",
        "Notepad",
        "Calculator"
      ],
      correctAnswer: 1,
      explanation: "Amtech ProDesign (now part of ETAP) and Trimble ID (formerly Cymap) are industry-standard electrical design software packages used extensively in the UK. They perform cable sizing, voltage drop calculations, discrimination studies, and generate distribution board schedules compliant with BS 7671. These tools are widely used by consultancies and design-and-build contractors."
    }
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link to="/study-centre/apprentice/functional-skills/module3" className="p-2 -ml-2 touch-manipulation">
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">Module 3 • Section 3</p>
            <h1 className="text-base font-bold text-white">Digital Documentation & Apps</h1>
          </div>
        </div>
      </div>

      {/* Hero with green gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Digital Documentation & Apps</h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Discover the digital tools transforming electrical work — from certification software and BIM viewers to project management apps and professional photo documentation techniques.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* Section 01 — Certification Software */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Certification Software</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Digital certification has largely replaced handwritten paper certificates in the UK electrical industry. Using certification software produces professional, legible, and compliant documents while saving significant time. Understanding the available options and how to use them effectively is an essential skill for modern electricians.
            </p>
            <p>
              <strong className="text-white">NICEIC Certification Portal (Certsure)</strong> — If you are registered with NICEIC or ELECSA, you have access to the Certsure online certification portal. This browser-based system allows you to create Electrical Installation Certificates (EICs), Electrical Installation Condition Reports (EICRs), Minor Electrical Installation Works Certificates, and Building Regulations compliance notifications. Certificates are stored in the cloud and can be accessed from any device. The portal validates your entries against BS 7671 requirements, reducing the risk of non-compliant documentation.
            </p>
            <p>
              <strong className="text-white">iCertifi</strong> — A popular independent certification app available on iOS, Android, and desktop. iCertifi allows you to create all standard electrical certificates and test schedules. It features auto-population of common fields, built-in calculation tools for Zs values, and the ability to include site photographs within the certificate. Documents are generated as professional PDFs that can be emailed directly to clients.
            </p>
            <p>
              <strong className="text-white">EasyCert</strong> — Another widely used certification platform offering similar functionality. EasyCert provides template-based certificate creation with intelligent field validation. It supports multiple users within a company, making it suitable for larger electrical firms where several operatives need to issue certificates.
            </p>
            <p>
              <strong className="text-white">Benefits of Digital Certification:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Legibility</strong> — No more struggling to read handwritten entries. Every field is typed, ensuring clarity for clients, building control, and auditors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Validation</strong> — Software can flag missing fields, out-of-range values, and inconsistencies before you finalise the certificate.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Storage and Retrieval</strong> — Digital certificates are automatically saved and searchable. Finding a certificate from three years ago takes seconds rather than rummaging through filing cabinets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Distribution</strong> — Email certificates directly to clients, estate agents, or building control from within the app. No printing, posting, or scanning required.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Compliance</strong> — Digital platforms are updated when regulations change, ensuring your certificate templates remain current with the latest edition of BS 7671.</span>
              </li>
            </ul>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Whichever certification software you choose, invest time in learning it thoroughly. Complete a few practice certificates before using it on a real job. The time spent learning the interface will be repaid many times over in faster, more accurate certificate production throughout your career.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 02 — PDF Annotation Tools */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">PDF Annotation Tools</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              PDF documents are everywhere in electrical work — from regulation documents and manufacturer datasheets to floor plans and as-built drawings. Being able to annotate (mark up) these documents digitally is a valuable skill that replaces the need to print, write on, and re-scan documents.
            </p>
            <p>
              <strong className="text-white">What is PDF Annotation?</strong> — Annotation means adding comments, highlights, drawings, stamps, and text to a PDF without altering the original document content. Your annotations appear as a separate layer on top of the document. The recipient can see your notes, respond to them, or remove them — but the underlying document remains intact.
            </p>
            <p>
              <strong className="text-white">Popular PDF Annotation Tools:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Adobe Acrobat Reader (Free)</strong> — The industry standard for viewing and annotating PDFs. The free version includes highlighting, text comments, sticky notes, drawing tools, and stamp tools. The paid version (Acrobat Pro) adds editing capabilities, form creation, and advanced features.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Bluebeam Revu</strong> — The professional standard for construction document management. Widely used on commercial projects, Bluebeam offers powerful markup tools including measurement tools, symbol stamps specific to electrical work, batch processing, and cloud-based collaboration features. If you work on larger commercial or industrial projects, familiarity with Bluebeam is a significant advantage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">PDF Expert (macOS/iOS)</strong> — A popular choice for Apple users. Offers clean annotation tools, form filling, and a smooth touch-screen experience on iPad — ideal for annotating drawings on site using a tablet.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Xodo (Free, Cross-Platform)</strong> — A lightweight, free option that works on Windows, Android, iOS, and in web browsers. Excellent for quick annotations on site when you do not need the full power of Bluebeam.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Practical Uses for Electricians:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Mark up floor plans to show proposed cable routes, accessory positions, and distribution board locations during the quotation stage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Highlight areas of concern on EICR observations — circle the defective item on the drawing and add a comment describing the issue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Annotate manufacturer datasheets with installation notes specific to your project</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Mark up revision changes on drawings to track what has changed between design issues</span>
              </li>
            </ul>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Annotating drawings digitally is faster, cleaner, and more professional than hand-marking printed copies. It also creates a digital audit trail showing exactly what was communicated and when — invaluable if disputes arise about what was agreed.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 02 */}
        <InlineCheck
          question="You receive a floor plan as a PDF and need to mark the proposed positions of socket outlets and light fittings. What is the most efficient approach?"
          options={[
            "Print the PDF, draw on it with a pen, then scan it back into your computer",
            "Use a PDF annotation tool to add symbols and text comments directly on the digital document",
            "Describe all positions in a separate Word document",
            "Take a photograph of the printed plan with your markings"
          ]}
          correctIndex={1}
          explanation="Using a PDF annotation tool allows you to mark positions directly on the digital drawing with precision. Symbols can be resized, repositioned, and labelled clearly. The annotated file can be shared electronically, maintains quality, and creates a professional document suitable for client approval and site reference."
        />

        {/* Section 03 — Photo Evidence & Documentation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Photo Evidence & Documentation</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Photographs are among the most powerful documentation tools available to electricians. A well-taken photograph provides unambiguous evidence of the condition of an installation, your workmanship, and compliance with standards. Developing good photographic documentation habits from the start of your apprenticeship will protect you professionally throughout your career.
            </p>
            <p>
              <strong className="text-white">When to Photograph:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Before starting work</strong> — Document the existing condition of the installation. This protects you against claims that you caused pre-existing damage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">During first fix</strong> — Photograph cable routes before they are concealed behind plasterboard or under flooring. Once covered, these routes are invisible — but your photographs prove the cables are correctly installed and mechanically protected.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Completed installation</strong> — Photograph the finished consumer unit (with cover on and off), key accessory installations, and any specialist equipment. These demonstrate your standard of workmanship.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Defects found during inspection</strong> — When conducting EICRs, photograph every defect you record. This provides evidence to support your observations and helps the client understand the issues.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Photography Technique for Documentation:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Wide shot first</strong> — Take a photograph showing the context: which room, which wall, and the general arrangement. This establishes where the detail shots were taken.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Medium shot</strong> — Move closer to show the specific area of interest: the consumer unit, a junction box, or a cable run.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Close-up detail</strong> — Capture specific details: circuit labels, cable sizes, damage, or defects. Ensure the subject is in sharp focus and well-lit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Lighting</strong> — Use your phone's flash or a portable torch to illuminate dark areas like loft spaces, under-floor voids, and distribution boards. Avoid photographing directly into bright windows, as this creates silhouettes.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Metadata and Timestamps</strong> — Modern smartphones automatically embed metadata in photographs, including date, time, GPS coordinates, and device information. Ensure your phone's location services are enabled when taking site photos. Some dedicated documentation apps (e.g. PhotoStamp Camera, Timestamp Camera) can overlay date, time, and location directly onto the image as a visible watermark, providing tamper-evident proof.
            </p>
            <p>
              <strong className="text-white">Organising Site Photographs</strong> — Create a folder for each job and organise photographs immediately after the site visit. Use the naming conventions discussed in Section 1 (e.g. 2025-06-15_SmithRes_Photo_DB-Before.jpg). Alternatively, many certification apps allow you to attach photographs directly to specific sections of a certificate.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Take more photographs than you think you need. Storage is essentially free, and a photograph you do not need costs nothing — but a photograph you need but did not take could cost you dearly. Make site photography a habitual part of every job.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 04 — Digital Signature Tools */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Digital Signature Tools</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Digital signatures enable you to sign documents electronically without printing, signing by hand, and scanning. They are legally recognised in the UK and are increasingly expected by clients, main contractors, and regulatory bodies. Understanding how to use digital signatures properly makes your business operations faster and more professional.
            </p>
            <p>
              <strong className="text-white">Legal Standing in the UK</strong> — The Electronic Communications Act 2000 and the UK's adoption of eIDAS (Electronic Identification, Authentication, and Trust Services) regulation establish that electronic signatures are legally valid for most business purposes. There are three tiers: Simple Electronic Signatures (e.g. typing your name in an email), Advanced Electronic Signatures (uniquely linked to the signatory with identity verification), and Qualified Electronic Signatures (the highest standard, equivalent to handwritten signatures in all legal contexts).
            </p>
            <p>
              <strong className="text-white">Popular Digital Signature Services:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">DocuSign</strong> — The market leader for electronic signatures. Send documents for signature, track signing progress, and store completed documents securely. DocuSign provides a complete audit trail showing who signed, when, and from which IP address.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Adobe Sign</strong> — Integrated with Adobe Acrobat, making it seamless to prepare, send, and sign PDFs. Particularly useful if you already use Adobe products for document management.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">SignNow</strong> — An affordable alternative with a user-friendly interface. Offers templates for frequently used documents, which is useful for electricians who regularly send the same types of forms (e.g. terms and conditions, risk assessments).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Built-in Certification App Signatures</strong> — Most electrical certification apps (iCertifi, EasyCert) include built-in signature capture. Clients can sign directly on your tablet or phone screen when you complete the work, and the signature is embedded in the PDF certificate.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Use Cases for Electricians:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Client acceptance of quotations — send a quote, client signs electronically, work is authorised</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Electrical certificates — both the electrician and client sign the certificate digitally</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Risk assessments and method statements — signed by all relevant parties before work commences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Subcontractor agreements and terms of engagement</span>
              </li>
            </ul>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Digital signatures eliminate the delay between completing work and obtaining signed documentation. Instead of posting a certificate and waiting for a signed copy to be returned, you can have the client sign on your tablet before you leave site. This dramatically reduces your administrative burden and accelerates payment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 04 */}
        <InlineCheck
          question="A client queries whether a digital signature on their electrical certificate is legally valid. What is the correct response?"
          options={[
            "Digital signatures are not legally valid — you need to provide a handwritten signature",
            "Digital signatures are legally valid in the UK under the Electronic Communications Act 2000 and eIDAS regulations",
            "Digital signatures are only valid for emails, not for certificates",
            "Digital signatures require a solicitor to verify them"
          ]}
          correctIndex={1}
          explanation="Digital signatures are fully legally valid in the UK. The Electronic Communications Act 2000 and the retained eIDAS regulation recognise electronic signatures for most business purposes. In fact, digital signatures provide a more robust audit trail than handwritten signatures, as they record who signed, when, and from which device."
        />

        {/* Section 05 — Project Management Apps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Project Management Apps</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              As your career progresses and you take on larger or multiple simultaneous projects, project management tools become essential for keeping track of tasks, deadlines, materials, and team coordination. Even for sole traders, a simple project management system prevents jobs from falling through the cracks.
            </p>
            <p>
              <strong className="text-white">Popular Options for Electrical Work:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Trello</strong> — Uses a visual board system with cards that move through columns (e.g. To Do → In Progress → Complete). Ideal for smaller teams. Free for basic use. Create a board per project, with cards for each task: "Order materials," "First fix," "Second fix," "Test and commission," "Issue certificates."</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Monday.com</strong> — A more feature-rich project management platform with timelines, workload views, and automation. Suitable for growing electrical companies managing multiple projects with several team members.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Jobber / ServiceM8</strong> — Purpose-built for trades businesses. These apps combine scheduling, quoting, invoicing, and client management in one platform. Particularly well-suited to domestic electricians and small firms. ServiceM8 is widely used in the UK trades sector.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Microsoft Planner / Google Tasks</strong> — If you already use Microsoft 365 or Google Workspace, these built-in tools provide simple task management without additional subscriptions. They integrate with your existing calendar, email, and file storage.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Key Features to Use:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Task assignment</strong> — Assign specific tasks to team members so everyone knows their responsibilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Deadline tracking</strong> — Set due dates for each task and receive reminders before deadlines pass</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">File attachments</strong> — Attach relevant drawings, specifications, and photographs to each task</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Progress tracking</strong> — See at a glance which tasks are completed, in progress, or overdue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Client communication</strong> — Some platforms allow you to share project progress with clients, keeping them informed without additional phone calls or emails</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Section 06 — Building Information Modelling */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Building Information Modelling (BIM)</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Building Information Modelling (BIM) is transforming how buildings are designed, constructed, and maintained. As an electrician, particularly if you work on commercial or public sector projects, BIM will increasingly be part of your working environment. Understanding what BIM is and how it affects your work positions you ahead of many in the trade.
            </p>
            <p>
              <strong className="text-white">What is BIM?</strong> — BIM is a digital representation of the physical and functional characteristics of a building. Unlike a traditional 2D drawing, a BIM model is a 3D digital twin of the building that contains detailed information about every element — including electrical systems. The model includes not just the geometry (where things are) but also data (what they are, their specifications, manufacturer details, maintenance schedules).
            </p>
            <p>
              <strong className="text-white">BIM Levels:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Level 0</strong> — Unmanaged CAD, essentially traditional 2D drawings with no collaboration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Level 1</strong> — Managed CAD with some 3D elements and a standard structure for data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Level 2</strong> — Collaborative BIM where different disciplines work on their own 3D models that are combined into a federated model. This is the minimum standard for UK government projects since 2016.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Level 3</strong> — Full integration where all disciplines work on a single shared model. This is the future direction of the industry.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">How BIM Affects Electricians:</strong> On BIM-enabled projects, you may receive 3D models showing the building's electrical design rather than traditional 2D drawings. BIM viewers (such as Autodesk Viewer, BIMcollab, or Navisworks Freedom — all free) allow you to rotate, zoom, and explore the model. You can see exactly where cables should run, identify potential clashes with other services (plumbing, HVAC), and understand the spatial relationships between electrical components.
            </p>
            <p>
              <strong className="text-white">Clash Detection</strong> — One of BIM's greatest benefits is automated clash detection. The software identifies where different building systems physically conflict — for example, where a cable tray route passes through a structural beam, or where a distribution board is positioned behind a drainage pipe. Identifying these clashes digitally before work begins on site saves enormous time and money compared to discovering them during installation.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                You do not need to become a BIM expert, but understanding the basics and being able to navigate a BIM model using a free viewer gives you a significant advantage. BIM adoption is growing rapidly, and electricians who can work with digital models are increasingly sought after by forward-thinking contractors.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 06 */}
        <InlineCheck
          question="Your project manager asks you to review the electrical layout in a BIM model for potential clashes with the mechanical services. What tool could you use?"
          options={[
            "Microsoft Word",
            "A free BIM viewer such as Autodesk Viewer or Navisworks Freedom",
            "An email client",
            "A calculator"
          ]}
          correctIndex={1}
          explanation="Free BIM viewers like Autodesk Viewer (browser-based) or Navisworks Freedom (desktop application) allow you to open, navigate, and explore BIM models without purchasing expensive software. You can rotate the 3D model, hide or isolate specific systems, and visually identify where electrical services clash with mechanical, structural, or plumbing elements."
        />

        {/* Section 07 — Electrical Design Software */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Electrical Design Software</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              While spreadsheets handle individual calculations well, dedicated electrical design software automates the entire design process — from cable sizing and voltage drop to fault level analysis and discrimination studies. Understanding these tools, even at a basic level, enhances your career prospects and helps you work more effectively with design engineers.
            </p>
            <p>
              <strong className="text-white">Industry-Standard Software in the UK:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Amtech ProDesign (now ETAP)</strong> — One of the most widely used electrical design packages in the UK. ProDesign performs cable sizing, voltage drop calculations, protective device selection, discrimination analysis, and generates BS 7671-compliant documentation. It integrates with manufacturer databases to select real products.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Trimble ID (formerly Cymap Electrical)</strong> — Another industry-leading package for electrical design. Features include load assessment, circuit design, distribution board scheduling, and lighting calculations (lux level design). Trimble ID is widely used by M&E consultancies and design-and-build contractors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">ElectricalOM</strong> — A more accessible (and more affordable) BS 7671-compliant design tool suitable for electricians and smaller firms. It performs cable sizing, voltage drop, earth fault loop impedance, and discrimination calculations with a user-friendly interface. A good option for electricians moving into design work.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">DIALux</strong> — A free lighting design tool widely used across Europe. DIALux calculates lux levels, energy consumption, and produces photometric renderings. It uses manufacturer luminaire data to provide accurate results. Essential for electricians involved in lighting design.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">AutoCAD and Electrical Drawing Software</strong> — AutoCAD remains the standard for producing electrical drawings. AutoCAD Electrical includes specific tools for creating schematic diagrams, panel layouts, and cable schedules. DraftSight is a lower-cost alternative that opens and edits AutoCAD files. For simpler diagrams, tools like SmartDraw or Lucidchart provide browser-based drawing capabilities without the complexity of full CAD software.
            </p>
            <p>
              <strong className="text-white">Why This Matters for Apprentices:</strong> Even if you are not designing installations from scratch, understanding how design software works helps you interpret the outputs. When a design engineer provides a cable schedule, discrimination chart, or lighting layout created in ProDesign or Trimble ID, knowing how these were generated helps you identify potential issues and communicate effectively with the design team.
            </p>
          </div>
        </motion.div>

        {/* Section 08 — Staying Current with Technology */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Staying Current with Technology</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Technology in the electrical industry evolves rapidly. Smart home systems, renewable energy technologies, electric vehicle charging, energy storage, and the Internet of Things (IoT) are creating new opportunities for electricians who embrace digital skills. Staying current with technological developments is not optional — it is a professional necessity.
            </p>
            <p>
              <strong className="text-white">Online Learning Resources:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">IET (Institution of Engineering and Technology)</strong> — Publishes BS 7671 and provides online courses, webinars, and technical guidance on regulation changes and best practice. The IET website is a definitive resource for UK electricians.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">NICEIC / ELECSA Technical Bulletins</strong> — Regular updates on regulation interpretations, common defects, and industry developments. Available through the Certsure website and emailed to registered contractors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">YouTube Channels</strong> — Channels like "Electricians Life," "eFIXX," and "JG Electrical" provide practical tutorials, regulation explanations, and product reviews. Video content is particularly effective for learning hands-on skills and staying informed about new products.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Trade Publications</strong> — Electrical Review, Electrical Times, and Voltimum publish articles on industry trends, product innovations, and regulation changes. Most offer free email newsletters.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">CPD (Continuing Professional Development)</strong> — Most electrical registration bodies require or strongly encourage ongoing CPD. This includes attending courses, completing online training, attending manufacturer seminars, and self-study. Many CPD activities are free — manufacturer training sessions, for example, often include refreshments and hands-on experience with new products.
            </p>
            <p>
              <strong className="text-white">Emerging Technologies to Watch:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Smart home and building automation</strong> — KNX, Zigbee, Z-Wave protocols; voice-controlled lighting and heating; integrated building management systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">EV charging infrastructure</strong> — Domestic and commercial charge point installation, smart charging, Vehicle-to-Grid (V2G) technology</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Battery storage and solar PV</strong> — Domestic and commercial energy storage, microgeneration, grid-interactive systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">AI and automation</strong> — Artificial intelligence tools for design assistance, automated testing, and predictive maintenance</span>
              </li>
            </ul>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Dedicate at least 30 minutes per week to learning about new technologies and industry developments. Follow relevant social media accounts, subscribe to trade newsletters, and attend manufacturer training whenever possible. The electricians who thrive are those who adapt and learn continuously — technology waits for no one.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Digital Documentation & Apps Quiz" />

        {/* Nav footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module3/section2"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Spreadsheets
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module3/section4"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Online Safety
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule3Section3;
