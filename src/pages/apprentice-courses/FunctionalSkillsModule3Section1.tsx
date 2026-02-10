import { ArrowLeft, ArrowRight, FolderOpen, Monitor, FileText, Cloud, HardDrive, FolderTree, RefreshCw, Keyboard, Wrench } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule3Section1 = () => {
  useSEO(
    "Section 1: Computer Basics & File Management - Digital Skills for Electricians",
    "Learn essential computer skills including OS navigation, file types, cloud storage, naming conventions, folder organisation, backup strategies, keyboard shortcuts, and troubleshooting for electrical professionals."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "Which file type is most commonly used for sharing electrical certificates and test reports?",
      options: [
        ".docx (Word document)",
        ".pdf (Portable Document Format)",
        ".xlsx (Excel spreadsheet)",
        ".jpg (Image file)"
      ],
      correctAnswer: 1,
      explanation: "PDF (Portable Document Format) is the industry standard for sharing electrical certificates, test reports, and compliance documentation. PDFs preserve formatting across all devices and cannot be easily altered, making them ideal for official records and regulatory submissions."
    },
    {
      id: 2,
      question: "What does the 3-2-1 backup rule recommend?",
      options: [
        "3 computers, 2 hard drives, 1 USB stick",
        "3 copies of your data, on 2 different media types, with 1 stored off-site",
        "Back up 3 times a day, 2 times a week, 1 time a month",
        "3 folders, 2 subfolders, 1 file per subfolder"
      ],
      correctAnswer: 1,
      explanation: "The 3-2-1 rule means keeping 3 copies of your data, stored on 2 different types of media (e.g. hard drive and cloud), with 1 copy stored off-site or in the cloud. This protects against hardware failure, theft, and disaster — essential for safeguarding irreplaceable certificates and job records."
    },
    {
      id: 3,
      question: "Which keyboard shortcut allows you to quickly save a document in most applications?",
      options: [
        "Ctrl + P",
        "Ctrl + Z",
        "Ctrl + S",
        "Ctrl + C"
      ],
      correctAnswer: 2,
      explanation: "Ctrl + S (or Cmd + S on Mac) is the universal shortcut for saving your current document. Building a habit of pressing Ctrl + S regularly means you will never lose work due to a crash or power cut — particularly important when filling in lengthy test schedules or reports."
    },
    {
      id: 4,
      question: "What is the recommended file naming format for job-related documents?",
      options: [
        "Document1.pdf, Document2.pdf",
        "YYYY-MM-DD_ClientName_DocumentType.pdf",
        "final_version_v2_FINAL_NEW.pdf",
        "random file name here.pdf"
      ],
      correctAnswer: 1,
      explanation: "Using the format YYYY-MM-DD_ClientName_DocumentType.pdf (e.g. 2025-06-15_SmithResidence_EICR.pdf) ensures files sort chronologically, are immediately identifiable, and can be located quickly. Consistent naming is critical when you may need to retrieve certificates years later for compliance audits."
    },
    {
      id: 5,
      question: "Which cloud storage feature is most valuable for electricians working across multiple sites?",
      options: [
        "The ability to change font colours",
        "Automatic synchronisation across all devices",
        "The ability to play music files",
        "Built-in calculator functions"
      ],
      correctAnswer: 1,
      explanation: "Automatic synchronisation means files saved on your tablet at a job site are instantly available on your office computer or phone. This is invaluable for electricians who photograph installations on site and need to include them in reports or share them with contractors and clients immediately."
    },
    {
      id: 6,
      question: "What is the purpose of the .dwg file extension?",
      options: [
        "A compressed image format",
        "A video file format",
        "An AutoCAD drawing file used for electrical plans and layouts",
        "A database file for customer records"
      ],
      correctAnswer: 2,
      explanation: "The .dwg file extension is the native format for AutoCAD, the industry-standard software for creating technical drawings. Electricians frequently encounter .dwg files containing floor plans, circuit layouts, and cable routing diagrams from architects and design engineers."
    },
    {
      id: 7,
      question: "When your computer runs slowly, which of the following is the best first troubleshooting step?",
      options: [
        "Immediately buy a new computer",
        "Delete the operating system",
        "Restart the computer and close unnecessary programs",
        "Increase the screen brightness"
      ],
      correctAnswer: 2,
      explanation: "Restarting clears temporary files and frees up memory consumed by background processes. Closing unnecessary programs reduces the demand on your processor and RAM. This simple step resolves the majority of performance issues and should always be your first action before seeking further help."
    },
    {
      id: 8,
      question: "Which folder structure best organises electrical job files?",
      options: [
        "All files in one folder on the desktop",
        "Organised by year → client → job type (e.g. 2025/Smith/EICR/)",
        "Organised alphabetically by file name only",
        "Saved randomly across different drives"
      ],
      correctAnswer: 1,
      explanation: "A hierarchical structure of Year → Client → Job Type mirrors how electrical work is tracked and audited. It allows you to find any document quickly, supports compliance requirements for record retention (typically 5-10 years for certificates), and scales effectively as your workload grows."
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
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">Module 3 • Section 1</p>
            <h1 className="text-base font-bold text-white">Computer Basics & File Management</h1>
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
                <FolderOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Computer Basics & File Management</h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Master the essential computer skills every electrician needs — from navigating your operating system to organising job files, backing up certificates, and troubleshooting common issues on site.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* Section 01 — Operating System Navigation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Operating System Navigation</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Whether you use Windows, macOS, or a Linux-based system, understanding how to navigate your operating system (OS) is the foundation of all digital skills. As an electrician, you will use your computer daily for writing reports, sending emails, managing certificates, and accessing technical documentation. Knowing your way around the OS saves time and reduces frustration.
            </p>
            <p>
              <strong className="text-white">The Desktop</strong> is your starting point. Think of it as your digital workbench. On Windows, you will see the Taskbar along the bottom with the Start Menu on the left. On macOS, the Dock sits at the bottom and the Menu Bar runs across the top. Keep your desktop tidy — only place shortcuts to the applications you use most frequently, such as your email client, certification software, and file manager.
            </p>
            <p>
              <strong className="text-white">The File Explorer (Windows) or Finder (macOS)</strong> is how you browse, move, copy, and delete files and folders. Learn to use the navigation pane on the left to jump between commonly used locations like Documents, Downloads, and external drives. The address bar at the top shows your current location in the folder hierarchy — you can click on any part of the path to navigate directly to that level.
            </p>
            <p>
              <strong className="text-white">The Settings or Control Panel</strong> allows you to configure your system. Key settings for electricians include display brightness (useful when working in bright site conditions or dim loft spaces), default applications for opening PDFs and spreadsheets, network and Wi-Fi configuration for connecting to site networks, and printer setup for producing hard copies of certificates.
            </p>
            <p>
              <strong className="text-white">Multiple Windows and Tabs</strong> are essential for working efficiently. Learn to use Alt + Tab (Windows) or Cmd + Tab (macOS) to switch between open applications. Many electricians keep their certification software, a browser with regulations, and their email open simultaneously. On Windows, you can snap windows side by side by dragging them to the left or right edge of the screen, or use the Windows key + arrow keys.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Spend 10 minutes each day exploring a feature of your OS you have not used before. Familiarity breeds speed — and on a busy job site, every minute saved on admin means more time for the work that matters.
              </p>
            </div>
            <p>
              <strong className="text-white">The Search Function</strong> is one of the most powerful tools available. On Windows, press the Windows key and start typing to search for files, applications, or settings. On macOS, press Cmd + Space to open Spotlight. Instead of manually browsing through folders, you can find any file in seconds by typing part of its name. This is particularly useful when you need to locate a specific certificate or test report quickly.
            </p>
            <p>
              <strong className="text-white">Notifications and System Tray</strong> — the bottom-right corner of your screen (Windows) or top-right (macOS) contains system notifications, battery status, network connection information, and quick settings. Keep an eye on notifications for software updates, as these often contain security patches that protect your customer data and business information.
            </p>
          </div>
        </motion.div>

        {/* Section 02 — File Types for Electricians */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">File Types for Electricians</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Understanding file types is crucial for working efficiently and sharing documents correctly. Each file extension tells your computer which application to use when opening the file. Here are the most important file types you will encounter in your electrical career:
            </p>
            <p>
              <strong className="text-white">.pdf (Portable Document Format)</strong> — This is the most important file type for electricians. Electrical Installation Certificates (EICs), Electrical Installation Condition Reports (EICRs), Minor Works Certificates, and BS 7671 documentation are almost always distributed as PDFs. PDFs preserve exact formatting regardless of which device or operating system opens them, and they are difficult to alter accidentally, which is essential for official documentation. Always save and send certificates as PDF files.
            </p>
            <p>
              <strong className="text-white">.xlsx / .xls (Excel Spreadsheets)</strong> — Spreadsheets are used extensively for cable calculations, material takeoffs, job costing, and scheduling. The .xlsx format is the modern standard (Excel 2007 onwards), while .xls is the older format. You may also encounter .csv (Comma Separated Values) files, which are simple text-based spreadsheets that can be opened in any spreadsheet application. Cable sizing calculators, voltage drop calculations, and bill of materials documents commonly use these formats.
            </p>
            <p>
              <strong className="text-white">.dwg / .dxf (AutoCAD Drawings)</strong> — These are technical drawing files created in AutoCAD or similar CAD software. Floor plans, wiring diagrams, distribution board layouts, and cable routing plans are typically supplied in .dwg format. The .dxf (Drawing Exchange Format) is a universal version that can be opened by most CAD applications. As an electrician, you will receive these files from architects and building designers. Free viewers like Autodesk Viewer allow you to open .dwg files without purchasing AutoCAD.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">.jpg / .png (Images)</strong> — Used for site photographs, installation evidence, and before/after documentation. JPG files are compressed and smaller in size, making them ideal for site photos. PNG files support transparency and are better for diagrams and logos. Always take photos of your completed work for your records.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">.docx (Word Documents)</strong> — Used for method statements, risk assessments, quotations, and correspondence. Word documents are editable and support formatting, headers, and tables. Many companies use Word templates for standard documents like RAMS (Risk Assessment and Method Statement).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">.zip / .rar (Compressed Archives)</strong> — These bundle multiple files into a single compressed file for easy sharing. You might receive a .zip file containing all drawings and specifications for a project. On Windows, right-click and select "Extract All" to unpack them. On macOS, simply double-click the archive.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">.msg / .eml (Email Files)</strong> — Saved emails that serve as records of communications with clients, suppliers, or contractors. Keeping email records of agreed specifications, change requests, and approvals protects you professionally.</span>
              </li>
            </ul>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                If you receive a file type you do not recognise, never open it blindly — it could be malware. Search for the extension online to understand what it is, and only open files from trusted sources. When in doubt, ask the sender to resend in a common format like PDF.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 02 */}
        <InlineCheck
          question="You need to send a completed EICR to a client. Which file format should you use to ensure the document looks identical on their device?"
          options={[
            ".docx — so they can edit it",
            ".pdf — preserves formatting and prevents accidental changes",
            ".xlsx — for spreadsheet compatibility",
            ".jpg — as an image of the document"
          ]}
          correctIndex={1}
          explanation="PDF is the correct format for sending official electrical certificates and reports. It preserves exact formatting across all devices and operating systems, and prevents the recipient from accidentally modifying the content. This is the industry-standard format for compliance documentation."
        />

        {/* Section 03 — Cloud Storage Solutions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Cloud Storage Solutions</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Cloud storage has transformed how electricians manage their files. Instead of relying solely on a single computer or USB drive that can be lost, stolen, or damaged, cloud storage keeps your files safely synchronised across all your devices and accessible from anywhere with an internet connection.
            </p>
            <p>
              <strong className="text-white">What is Cloud Storage?</strong> — Cloud storage means your files are stored on secure servers maintained by companies like Microsoft, Google, or Apple, rather than only on your local device. When you save a file to your cloud storage, it is automatically uploaded to these servers and synchronised to any other device signed into the same account. If your laptop breaks, your files are safe. If you need a certificate while on site, you can access it from your phone.
            </p>
            <p>
              <strong className="text-white">Popular Cloud Storage Services:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Microsoft OneDrive</strong> — Included with Microsoft 365 subscriptions (5 GB free, 1 TB with subscription). Integrates seamlessly with Windows and Microsoft Office applications. Ideal if you use Word, Excel, and Outlook for your business documentation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Google Drive</strong> — 15 GB free storage. Works brilliantly with Google Docs, Sheets, and Gmail. Excellent for collaboration — you can share folders with colleagues and contractors who can view or edit files in real time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Apple iCloud</strong> — 5 GB free, with paid plans up to 12 TB. Best for those using iPhone, iPad, and Mac. Photos taken on your iPhone are automatically available on your Mac, making it easy to include site photos in reports.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Dropbox</strong> — 2 GB free. Known for its reliability and simple interface. The "Smart Sync" feature allows you to see all your files without storing them all locally, which is useful if your laptop has limited storage.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Setting Up Cloud Storage for Electrical Work</strong> — Create a dedicated folder structure within your cloud storage for all electrical work. A suggested top-level structure might include folders for Active Jobs, Completed Jobs, Templates (certificate templates, RAMS templates, quotation templates), Training & CPD, and Business Administration. This mirrors a physical filing cabinet but with the advantage of being searchable and accessible from any device.
            </p>
            <p>
              <strong className="text-white">Sharing Files from the Cloud</strong> — Instead of attaching large files to emails (which can be rejected if over the size limit), you can share a link to the file in your cloud storage. Most services let you set permissions: "View only" for clients receiving certificates, or "Can edit" for colleagues collaborating on a project. You can also set expiry dates on shared links for added security.
            </p>
            <p>
              <strong className="text-white">Offline Access</strong> — A common concern for electricians is: "What if there is no internet on site?" Most cloud storage apps allow you to mark specific files or folders as "Available Offline." These files are downloaded to your device and synchronised when you next connect to the internet. Mark your current job folders for offline access before heading to site.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Cloud storage is not just convenient — it is a professional necessity. Electrical certificates must be retained for years. If your only copy is on a laptop that gets stolen from your van, you lose irreplaceable records. Cloud storage provides automatic off-site backup that protects your business.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 04 — File Naming Conventions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">File Naming Conventions</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              A consistent file naming convention is one of the simplest yet most impactful digital skills you can develop. When you have hundreds of certificates, photographs, and documents, being able to locate the right file in seconds rather than minutes saves enormous amounts of time and reduces stress during audits or disputes.
            </p>
            <p>
              <strong className="text-white">The Golden Rule: Date First</strong> — Always begin file names with the date in YYYY-MM-DD format (e.g. 2025-06-15). This format ensures files sort chronologically in any file manager, regardless of your system's regional settings. Using DD-MM-YYYY or MM-DD-YYYY causes inconsistent sorting and confusion.
            </p>
            <p>
              <strong className="text-white">Recommended Format:</strong> <code className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded">YYYY-MM-DD_ClientOrSite_DocumentType_Version.ext</code>
            </p>
            <p>
              <strong className="text-white">Examples for Electrical Work:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">2025-06-15_SmithResidence_EICR.pdf</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">2025-06-15_SmithResidence_Photos_ConsumerUnit.zip</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">2025-07-01_OakfieldSchool_MinorWorks_Classroom4.pdf</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">2025-07-03_OakfieldSchool_CableSizing_v2.xlsx</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">2025-08-20_HighStreetShop_Quotation_Rewire.pdf</code></span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Characters to Avoid</strong> — Never use spaces, slashes, colons, asterisks, question marks, or special characters in file names. Use underscores (_) or hyphens (-) to separate words. Some operating systems and cloud services cannot handle special characters, which can cause files to become inaccessible or corrupted during transfer.
            </p>
            <p>
              <strong className="text-white">Version Control</strong> — When you need to revise a document, add a version suffix: _v1, _v2, _v3. Never use "final", "final2", "FINAL_REALLY_FINAL" — this quickly becomes meaningless. If you use version numbers, the latest version is always the highest number. For collaborative documents, consider including your initials: _v2_AM.
            </p>
            <p>
              <strong className="text-white">Photograph Naming</strong> — Site photographs are particularly prone to disorganisation. Your phone names photos with timestamps like IMG_20250615_143022.jpg, which is meaningless weeks later. Rename photos as soon as possible: <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">2025-06-15_SmithRes_Photo_DB-Before.jpg</code> is infinitely more useful. Many cloud storage services allow you to rename files directly from your phone.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Adopt a naming convention on day one of your apprenticeship and stick to it rigorously. Your future self — and any colleagues who need to find your files — will thank you. A two-minute naming discipline saves hours of searching over a career.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 04 */}
        <InlineCheck
          question="Which file naming format ensures documents sort chronologically in any file manager?"
          options={[
            "DD-MM-YYYY_Client_DocType.pdf",
            "Client_DD-MM-YYYY_DocType.pdf",
            "YYYY-MM-DD_Client_DocType.pdf",
            "DocType_Client_YYYY.pdf"
          ]}
          correctIndex={2}
          explanation="The YYYY-MM-DD format (ISO 8601) ensures files sort in chronological order regardless of your operating system or regional settings. Starting with the year, then month, then day means files naturally arrange from oldest to newest when sorted alphabetically."
        />

        {/* Section 05 — Folder Organisation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Folder Organisation</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              A well-organised folder structure is the digital equivalent of a tidy tool bag — everything has its place, and you can find what you need without rummaging. For electricians, good folder organisation is especially important because of the volume and variety of documents generated over a career: certificates, photographs, calculations, quotations, invoices, and training records.
            </p>
            <p>
              <strong className="text-white">Recommended Top-Level Structure:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">01_Active_Jobs/</strong> — All current work, with a subfolder per job</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">02_Completed_Jobs/</strong> — Archive of finished jobs, organised by year</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">03_Templates/</strong> — Reusable templates for certificates, quotes, RAMS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">04_Training_CPD/</strong> — Course materials, CPD certificates, revision notes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">05_Business/</strong> — Insurance, registrations, company documents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">06_Technical_References/</strong> — BS 7671 amendments, manufacturer datasheets, wiring diagrams</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Job Folder Template:</strong> Within each job folder, create a consistent set of subfolders. This means every job has the same structure, so you always know where to find things:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">SmithResidence_2025/01_Quotation/</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">SmithResidence_2025/02_Drawings/</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">SmithResidence_2025/03_Calculations/</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">SmithResidence_2025/04_Certificates/</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">SmithResidence_2025/05_Photos/</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">SmithResidence_2025/06_Correspondence/</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">SmithResidence_2025/07_Invoices/</code></span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Numbering Folders</strong> — Prefixing folder names with numbers (01_, 02_, 03_) forces them into a logical order rather than alphabetical. This is particularly useful for workflow-based folders where you want the order to reflect the project lifecycle: quotation → drawings → calculations → certificates → invoices.
            </p>
            <p>
              <strong className="text-white">Archiving Completed Jobs</strong> — When a job is finished, move its folder from Active_Jobs to Completed_Jobs, organised by year. This keeps your active workspace clean while preserving all records. Electrical certificates should be retained for at least the life of the installation or as required by your registering body. Most electricians keep records for a minimum of 10 years.
            </p>
            <p>
              <strong className="text-white">Avoid Common Mistakes</strong> — Do not save everything to your desktop or Downloads folder. Do not create deeply nested folders more than 4-5 levels deep, as this makes navigation cumbersome. Do not duplicate files across multiple locations — this leads to version confusion. Instead, use shortcuts (Windows) or aliases (macOS) to link to files from multiple locations without duplicating them.
            </p>
          </div>
        </motion.div>

        {/* Section 06 — Backup Strategies */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Backup Strategies</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Data loss is not a question of "if" but "when." Hard drives fail, laptops get stolen from vans, phones get dropped on site, and ransomware can encrypt all your files. For electricians, losing certificates and job records can have serious professional and legal consequences. A robust backup strategy is non-negotiable.
            </p>
            <p>
              <strong className="text-white">The 3-2-1 Backup Rule</strong> — This is the gold standard for data protection:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">3 copies</strong> of every important file (the original plus two backups)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">2 different media types</strong> (e.g. your computer's hard drive and an external drive, or your computer and the cloud)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">1 copy off-site</strong> (cloud storage or an external drive kept at a different location from your computer)</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Automatic Backup Tools:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Windows Backup / File History</strong> — Built into Windows, this automatically backs up your files to an external drive at regular intervals. Set it up once and it runs silently in the background.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">macOS Time Machine</strong> — Apple's built-in backup solution creates hourly backups for the past 24 hours, daily backups for the past month, and weekly backups for older data. Simply plug in an external drive and Time Machine handles the rest.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Cloud Sync</strong> — If your files are in OneDrive, Google Drive, or similar, they are automatically backed up to the cloud. This counts as your off-site copy. However, remember that if you accidentally delete a file, the deletion may also synchronise — so cloud storage alone is not a complete backup solution.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">External Hard Drives</strong> — An external USB hard drive (or SSD for greater durability) provides a fast, affordable local backup. A 1TB external SSD costs around £50-80 and can store thousands of certificates, photographs, and documents. Keep one at home and one at your office or a trusted colleague's premises for off-site protection.
            </p>
            <p>
              <strong className="text-white">What to Prioritise for Backup:</strong> Not all files are equally important. Prioritise in this order: (1) Electrical certificates and test results — these are legally required records; (2) Photographs of installations — evidence you may need years later; (3) Financial records — invoices, receipts, tax documents; (4) Templates and business documents; (5) Training records and CPD certificates.
            </p>
            <p>
              <strong className="text-white">Testing Your Backups</strong> — A backup you have never tested is a backup you cannot trust. Once a month, try restoring a file from your backup to verify it works. There is nothing worse than discovering your backup has been failing silently for months when you actually need it.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Set up automatic backups today — do not wait until you lose data. The 3-2-1 rule (3 copies, 2 media types, 1 off-site) is simple to implement and provides comprehensive protection. An hour spent setting up backups can save weeks of recreating lost work.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 06 */}
        <InlineCheck
          question="Your laptop is stolen from your van overnight. You use OneDrive to sync your files. What is the status of your data?"
          options={[
            "All data is permanently lost",
            "Your files are safe in the cloud — log in from any device to access them",
            "Only files created today are lost",
            "You need to contact Microsoft to recover them"
          ]}
          correctIndex={1}
          explanation="Because your files were synchronised to OneDrive (cloud storage), they are stored on Microsoft's servers independently of your laptop. You can log into OneDrive from any device — another computer, your phone, or a web browser — and access all your files immediately. This is exactly why cloud storage is essential for electricians."
        />

        {/* Section 07 — Keyboard Shortcuts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Keyboard Shortcuts</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Keyboard shortcuts dramatically speed up your work by eliminating the need to navigate menus with your mouse. Learning even a handful of essential shortcuts can save you significant time over the course of a working week, particularly when completing repetitive tasks like filling in certificates or formatting reports.
            </p>
            <p>
              <strong className="text-white">Essential Shortcuts (Windows / macOS):</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+S / Cmd+S</strong> — Save. The most important shortcut. Press it constantly while working on documents. A sudden power cut or crash will not cost you hours of work if you save regularly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+C / Cmd+C</strong> — Copy selected text or files.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+V / Cmd+V</strong> — Paste what you copied. Incredibly useful for transferring readings and measurements between documents.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+X / Cmd+X</strong> — Cut (copy and remove from original location).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+Z / Cmd+Z</strong> — Undo the last action. Made a mistake? This reverses it. You can press it multiple times to undo several actions in sequence.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+Y / Cmd+Shift+Z</strong> — Redo (reverse an undo).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+A / Cmd+A</strong> — Select all text or items in the current document or folder.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+F / Cmd+F</strong> — Find. Search for specific text within a document, webpage, or spreadsheet. Essential for locating specific regulations in lengthy PDF documents like BS 7671.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+P / Cmd+P</strong> — Print the current document.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Alt+Tab / Cmd+Tab</strong> — Switch between open applications without reaching for the mouse.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">File Manager Shortcuts:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">F2</strong> — Rename the selected file. Much faster than right-clicking and selecting "Rename."</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+Shift+N / Cmd+Shift+N</strong> — Create a new folder.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Delete / Cmd+Backspace</strong> — Move selected file to the Recycle Bin / Trash.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Browser Shortcuts (for online certification platforms):</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+T / Cmd+T</strong> — Open a new tab.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+W / Cmd+W</strong> — Close the current tab.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+L / Cmd+L</strong> — Jump to the address bar to type a URL or search.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Ctrl+Shift+T / Cmd+Shift+T</strong> — Reopen a recently closed tab. Invaluable when you accidentally close a tab you were using.</span>
              </li>
            </ul>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                You do not need to memorise all shortcuts at once. Start with Ctrl+S, Ctrl+C, Ctrl+V, Ctrl+Z, and Ctrl+F — these five cover the vast majority of daily tasks. Once they become second nature, add more to your repertoire.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 08 — Troubleshooting Common Issues */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Troubleshooting Common Issues</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Every computer user encounters problems, and knowing how to troubleshoot common issues saves time and money. You do not need to be an IT expert — most problems have simple solutions that you can resolve yourself.
            </p>
            <p>
              <strong className="text-white">Slow Computer Performance</strong> — The most common complaint. First, check how many applications are running by opening Task Manager (Ctrl+Shift+Esc on Windows) or Activity Monitor (on macOS). Close any programs you are not actively using. If the problem persists, restart your computer — this clears temporary files and resets memory usage. Long-term solutions include upgrading from a hard disk drive (HDD) to a solid-state drive (SSD), adding more RAM, or uninstalling unused software.
            </p>
            <p>
              <strong className="text-white">Cannot Open a File</strong> — If you double-click a file and it does not open, the most likely cause is that you do not have the correct software installed. Check the file extension: .dwg files need a CAD viewer, .xlsx files need a spreadsheet application, and specialised certification files may need specific software. For most file types, free alternatives exist — LibreOffice opens Microsoft Office files, and Autodesk Viewer opens .dwg files.
            </p>
            <p>
              <strong className="text-white">Printer Not Working</strong> — Electricians frequently need to print certificates and reports. If your printer is not responding: (1) Check it is powered on and connected (USB cable or Wi-Fi); (2) Check for paper jams; (3) Open the print queue (Settings → Printers) and clear any stuck print jobs; (4) Restart the printer and your computer; (5) Reinstall the printer driver if necessary by visiting the manufacturer's website.
            </p>
            <p>
              <strong className="text-white">Wi-Fi Connection Issues</strong> — If you cannot connect to Wi-Fi: (1) Toggle Wi-Fi off and on; (2) Restart your router (unplug for 30 seconds, then reconnect); (3) Forget the network and reconnect by entering the password again; (4) Move closer to the router — thick walls and distance reduce signal strength; (5) Check if other devices can connect to rule out a device-specific issue.
            </p>
            <p>
              <strong className="text-white">Storage Full Warning</strong> — If your computer warns that storage is running low: (1) Empty the Recycle Bin / Trash; (2) Clear the Downloads folder of files you no longer need; (3) Use the built-in Storage Sense (Windows) or Manage Storage (macOS) tools to identify large files; (4) Move large files (especially photos and videos) to cloud storage or an external drive; (5) Uninstall applications you no longer use.
            </p>
            <p>
              <strong className="text-white">Software Crashes or Freezes</strong> — If an application becomes unresponsive: (1) Wait 30 seconds — the program may be processing a large file; (2) Try pressing Escape; (3) Use Task Manager (Ctrl+Shift+Esc) to force-close the application; (4) Restart the application. If the problem recurs, check for software updates or reinstall the application.
            </p>
            <p>
              <strong className="text-white">Lost or Accidentally Deleted Files</strong> — Do not panic. Check the Recycle Bin (Windows) or Trash (macOS) first — deleted files stay there until emptied. If you use cloud storage, check the "Deleted" or "Bin" folder in the cloud service. Cloud services typically retain deleted files for 30 days. If you use File History or Time Machine, you can restore previous versions of files.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                The universal troubleshooting step is: restart. Restarting your computer, router, printer, or application resolves the majority of common issues. If restarting does not help, search for the exact error message online — chances are someone else has encountered and solved the same problem.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Computer Basics & File Management Quiz" />

        {/* Nav footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module3"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Module
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module3/section2"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Spreadsheets & Calculations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule3Section1;
