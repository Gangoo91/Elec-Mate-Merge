/**
 * Functional Skills · Module 3 · Section 1 — Computer basics & file management
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 * DENSITY PASS (13 Sep): 14 ConceptBlocks told the learner about computers;
 * six worked examples and three try-its let them actually do anything, and
 * Cloud Storage, File Naming and Keyboard Shortcuts each taught a technique
 * with nothing directly after it applying what was just read. This pass:
 *
 *  - Merged the 14 ConceptBlocks to 8 (one per section, the maximum),
 *    denser rather than thinner — every fact, product name and capacity
 *    figure that was there before is still there, now argued in one
 *    continuous block instead of split across two with a repeated frame
 *    sentence between them.
 *  - Added three WorkedExamples (cloud storage: deciding what syncs/stays
 *    local/gets shared; file naming: three badly-named files fixed in
 *    sequence; keyboard shortcuts: the same task counted in mouse actions
 *    against keystrokes) and two TryIts (file types: which of four incoming
 *    files to open and which to leave alone; file naming: a fourth file to
 *    rename unaided), so every ConceptBlock is now followed, inside its own
 *    section, by a worked example applying exactly what it taught. Zero
 *    ordering failures.
 *  - The troubleshooting WorkedExample is rewritten as an explicit decision
 *    tree (symptom → first check → what that rules out → next check).
 *  - Cut only the passages about diligence and habit rather than the
 *    subject itself; that room went into practice, not padding.
 *  - No new regulation number, product claim or scheme name introduced. The
 *    two accuracy fixes from the original conversion (the folder-structure
 *    contradiction with old Q8, and the two-different-retention-claims
 *    sentence) are unchanged and still hold throughout.
 *
 * No named product here competes with certification or circuit-design
 * software, so Windows, macOS, OneDrive, Google Drive, iCloud, Dropbox,
 * AutoCAD and LibreOffice are named factually, as before. Free-tier storage
 * figures (OneDrive 5 GB, Google Drive 15 GB, iCloud 5 GB, Dropbox 2 GB) are
 * unchanged.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  Scenario,
  ContentEyebrow,
  SectionRule,
  WorkedExample,
  TryIt,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Computer Basics & File Management - Functional Skills Module 3.1';
const DESCRIPTION =
  'Functional Skills digital literacy for electricians: navigating your operating system, choosing the right file type, cloud storage, naming conventions, folder organisation, backup strategy, keyboard shortcuts and troubleshooting.';

const quizQuestions = [
  {
    id: 1,
    question:
      'Which file type is most commonly used for sharing electrical certificates and test reports?',
    options: [
      '.txt (plain text file)',
      '.pdf (Portable Document Format)',
      '.zip (compressed archive)',
      '.exe (executable program)',
    ],
    correctAnswer: 1,
    explanation:
      'PDF is the industry standard for sharing electrical certificates, test reports and compliance documentation. A PDF preserves formatting across every device and is not easily altered by the recipient, which is exactly what an official record needs.',
  },
  {
    id: 2,
    question: 'What does the 3-2-1 backup rule recommend?',
    options: [
      '3 passwords, changed every 2 weeks, with 1 written down',
      '3 cloud accounts, syncing every 2 hours, with 1 administrator',
      '3 copies of your data, on 2 different media types, with 1 stored off-site',
      '3 devices, 2 of them encrypted, with 1 kept switched off',
    ],
    correctAnswer: 2,
    explanation:
      '3 copies of the data, on 2 different media types, with 1 copy off-site. That off-site copy is what survives a stolen van or a house fire, which a second hard drive sat next to the first one does not.',
  },
  {
    id: 3,
    question: 'Which keyboard shortcut allows you to quickly save a document in most applications?',
    options: ['Ctrl + Z', 'Ctrl + P', 'Ctrl + C', 'Ctrl + S'],
    correctAnswer: 3,
    explanation:
      'Ctrl+S (Cmd+S on a Mac) saves the current document. Pressing it every few minutes, out of habit rather than necessity, is the single cheapest insurance policy against a crash or a power cut costing you an hour of work.',
  },
  {
    id: 4,
    question: 'What is the recommended file naming format for job-related documents?',
    options: [
      'YYYY-MM-DD_ClientName_DocumentType.pdf',
      'Document1.pdf, Document2.pdf',
      'final_version_v2_FINAL_NEW.pdf',
      'random file name here.pdf',
    ],
    correctAnswer: 0,
    explanation:
      'YYYY-MM-DD_ClientName_DocumentType.pdf — for example 2025-06-15_SmithResidence_EICR.pdf — sorts chronologically, tells you what the file is without opening it, and stays legible when you need to find it again years later for an audit.',
  },
  {
    id: 5,
    question:
      'Which cloud storage feature is most valuable for electricians working across multiple sites?',
    options: [
      'A larger range of document templates',
      'Automatic synchronisation across all devices',
      'Faster typing through predictive text',
      'A built-in photo editing suite',
    ],
    correctAnswer: 1,
    explanation:
      'Automatic synchronisation means a file saved on your tablet at the job is already sitting on your office computer and your phone by the time you get back to either. For an electrician working several sites a week, that is the feature that actually earns its keep.',
  },
  {
    id: 6,
    question: 'What is the purpose of the .dwg file extension?',
    options: [
      'A compressed folder used to email large files',
      'A spreadsheet format used for material takeoffs',
      'An AutoCAD drawing file used for electrical plans and layouts',
      'A database file used to store customer records',
    ],
    correctAnswer: 2,
    explanation:
      '.dwg is the native AutoCAD format. Architects and design engineers hand you floor plans, circuit layouts and cable routing diagrams in it, and you do not need AutoCAD itself to open one — a free viewer will do.',
  },
  {
    id: 7,
    question:
      'When your computer runs slowly, which of the following is the best first troubleshooting step?',
    options: [
      'Immediately reinstall the operating system',
      'Buy a new computer with a faster processor',
      'Delete all your saved documents to free up space',
      'Restart the computer and close unnecessary programs',
    ],
    correctAnswer: 3,
    explanation:
      'A restart clears out temporary files and whatever has quietly accumulated in memory since the machine was last switched off, and closing programs you are not using frees up what is left. It resolves most slowdowns and it costs nothing, which is why it is always the first move, not the last resort.',
  },
  {
    id: 8,
    question: 'Which top-level folder structure best organises electrical job files?',
    options: [
      'Numbered top-level folders — Active Jobs, Completed Jobs, Templates, Training & CPD, Business, Technical References — with each finished job filed inside Completed Jobs by year',
      'Organised alphabetically by file name only',
      'All files in one folder on the desktop',
      'Saved randomly across different drives',
    ],
    correctAnswer: 0,
    explanation:
      'Numbering the top-level folders (01_Active_Jobs, 02_Completed_Jobs, 03_Templates…) forces them into a fixed, logical order instead of an alphabetical accident, and it puts the year where it is actually useful — as a subfolder inside Completed_Jobs, once a job is finished — rather than as the very first thing you see in every listing. It scales cleanly as the number of jobs grows, and it matters for retention too: because certificates are kept for at least the life of the installation, a completed job needs one permanent, findable home rather than living wherever it happened to be saved.',
  },
];

const FunctionalSkillsModule3Section1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 1"
        title="Computer basics and file management"
        backTo="/study-centre/apprentice/functional-skills/module3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default, to match the rest of the course — this
            page carries filenames, folder paths and file extensions that read
            badly when they wrap mid-string. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Nobody fails an electrical inspection because of a bad filename. But plenty of
            electricians have lost an afternoon looking for a certificate they know they saved
            somewhere, or handed a client a document with the wrong version in it, or watched two
            years of job photos vanish with a stolen laptop that was never backed up. None of that
            is an electrical skill. All of it is a computer skill, and it is one you are expected to
            already have — nobody teaches it on site, so this section does.
          </p>

          <LearningOutcomes
            outcomes={[
              'Navigate your operating system confidently — the desktop, the file manager, search, and settings.',
              'Recognise the file types you will meet on a job and know which application opens each one.',
              'Use cloud storage as a working tool, not just a backup: synchronisation, sharing, and offline access.',
              'Apply one consistent file naming convention that sorts and searches correctly, every time.',
              'Build and maintain a folder structure that scales from a handful of jobs to several hundred.',
              'Run a proper backup strategy and know exactly what to do the day a device is lost or stolen.',
              'Use keyboard shortcuts to work faster, and troubleshoot the handful of problems that come up constantly.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'You use a computer or tablet for the job already',
                gist: 'Nothing here assumes advanced IT knowledge, but the examples assume you already save certificates, take site photos, and use email day to day.',
              },
              {
                term: 'Nothing electrical',
                gist: 'This section is digital literacy, not electrical theory. The only electrical content is the documents used as examples — certificates, test schedules, drawings.',
              },
            ]}
          />

          <TLDR
            points={[
              'Treat your operating system as a workbench: know where the desktop, the file manager, search and settings live, and you save minutes on every single job.',
              'A file extension tells the computer which application to use. PDF for anything you send to a client or a scheme; .dwg for drawings; .xlsx for calculations and schedules.',
              'Cloud storage is not a backup by accident — it is a working tool. Synchronisation means the photo you took on site is already on your office computer.',
              'One naming convention, used every time: YYYY-MM-DD_Client_DocumentType.pdf. The date goes first because that is the only order that sorts correctly on every system.',
              'A numbered top-level folder structure beats alphabetical or year-first every time it actually gets tested by six months of real jobs.',
              'The 3-2-1 backup rule — 3 copies, 2 media types, 1 off-site — is not paranoia. It is the difference between a stolen laptop being an inconvenience and being a catastrophe.',
              'Certificates are kept for at least the life of the installation. There is no single statutory number that covers every certificate type, so that is the defensible position, not a fixed year count.',
              'Five keyboard shortcuts — save, copy, paste, undo, find — cover most of what you do in a working day. Learn those five before any others.',
              'The universal first troubleshooting step is restart. It resolves the majority of everyday problems and costs nothing to try.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Operating system navigation</ContentEyebrow>

          <ConceptBlock
            title="The OS is a workbench: know the four regions, and search rather than hunt"
            onSite="Ten minutes spent finding your way around a feature you have never used pays for itself the first time it saves you from hunting through menus mid-job."
          >
            <p>
              Whether your machine runs Windows, macOS, or a Linux-based system, the layout is built
              around the same handful of ideas, once you learn to see them. The{' '}
              <strong className="text-white">desktop</strong> is the starting point — on Windows,
              the taskbar sits along the bottom with the Start Menu at the left; on macOS, the Dock
              sits at the bottom and the Menu Bar runs across the top. Keep it to shortcuts you
              actually use daily — your certification software, your email client, your file manager
              — rather than every download you have ever made.
            </p>
            <p>
              <strong className="text-white">File Explorer</strong> (Windows) or{' '}
              <strong className="text-white">Finder</strong> (macOS) is how you browse, move, copy
              and delete files and folders. The navigation pane on the left jumps you between common
              locations — Documents, Downloads, external drives — and the address bar at the top
              shows exactly where you are in the folder hierarchy. Click any part of that path and
              you jump straight to that level, instead of clicking back through folder after folder.
            </p>
            <p>
              <strong className="text-white">Settings</strong> (or Control Panel) is where you
              configure the machine: display brightness (a bright van cab, a dim loft), default
              applications for PDFs and spreadsheets, Wi-Fi for a site network, and printer setup
              for hard copies of certificates.
            </p>
            <p>
              The fourth region is <strong className="text-white">search</strong>, and it is the
              most underused feature on most people's computers. Press the Windows key and start
              typing, or Cmd+Space on a Mac for Spotlight — either way, you do not need the exact
              file name. A fragment of it, or a word you remember being inside the document, is
              often enough, and it is the fastest way to find a certificate when you cannot remember
              which job folder it landed in.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You need the EICR for a job you did roughly three months ago, for a client called Patterson, but you cannot remember which month's folder it is in. Work through finding it without browsing."
            steps={[
              {
                calc: '1. Open search',
                note: 'Windows key, or Cmd+Space on a Mac — not the file manager.',
              },
              {
                calc: '2. Type "Patterson EICR"',
                note: 'A fragment of the client name plus the document type, not the full filename — you do not need to remember it exactly.',
              },
              {
                calc: '3. Scan the results by date',
                note: 'If more than one comes back, the file naming convention (Section 04) tells you at a glance which is the right one, because the date is the first thing you see.',
              },
              {
                calc: '4. Open, do not re-save',
                note: 'Confirm it is the right document before you do anything else with it.',
              },
            ]}
            answer="A ten-second search beats a five-minute folder crawl, provided the file was named properly to begin with."
            watchOut="Search only finds what it can read in the filename, and on some systems, inside the document text too. A file named scan001.pdf will not turn up in a search for 'Patterson' — this is exactly why Section 04's naming convention is not optional admin, it is what makes search work at all."
          />

          <CommonMistake
            title="Everything saved to the desktop"
            whatHappens="The desktop becomes the default save location because it is the first thing you see. Within a few months it is a wall of icons with no order, search is slower because there is more clutter to sift, and a big drive/file transfer can silently miss anything sitting there rather than in a proper folder."
            doInstead="Save into the job folder structure from Section 05 as you go, not 'later.' If you must save to the desktop temporarily, move the file to its proper folder before you close the document — it takes five seconds while the filename is still in your head, and considerably longer once you have forgotten what the job was."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · File types for electricians</ContentEyebrow>

          <ConceptBlock title="The extension tells the computer which application to use">
            <p>
              Every file type you will meet in electrical work has a job it is suited to, and
              knowing the extension tells you what you are looking at before you even open it.
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <strong className="text-white">.pdf (Portable Document Format)</strong> — the most
                important type you will use. Electrical Installation Certificates, EICRs, Minor
                Works Certificates and BS 7671 documentation are almost always distributed as PDFs,
                because a PDF looks identical on every device that opens it and is not easily
                altered by whoever receives it. Certificates leave your hands as a PDF, always.
              </li>
              <li>
                <strong className="text-white">.xlsx / .xls (spreadsheets)</strong> — cable
                calculations, material takeoffs, job costing and scheduling. .xlsx is the modern
                Excel format; .xls is the older one. .csv (Comma Separated Values) is a plain-text
                spreadsheet format that opens in any spreadsheet application, useful when you are
                not sure what software the recipient has.
              </li>
              <li>
                <strong className="text-white">.dwg / .dxf (CAD drawings)</strong> — floor plans,
                wiring diagrams, distribution board layouts and cable routing plans, usually
                supplied by an architect or building designer. .dwg is AutoCAD's native format; .dxf
                is an exchange format most CAD software can read. You do not need to own AutoCAD to
                open one — a free viewer will do the job for reading and printing.
              </li>
              <li>
                <strong className="text-white">.jpg / .png (images)</strong> — site photographs and
                installation evidence. JPGs are compressed and smaller, which suits site photos;
                PNGs support transparency and suit diagrams and logos.
              </li>
              <li>
                <strong className="text-white">.docx (Word documents)</strong> — method statements,
                risk assessments, quotations and correspondence: anything that needs editing rather
                than locking down. LibreOffice, a free alternative to Microsoft Office, opens .docx
                files without issue if you do not have Word installed.
              </li>
              <li>
                <strong className="text-white">.zip / .rar (compressed archives)</strong> — several
                files bundled into one for easy sharing, such as a full set of drawings for a
                project. Right-click and "Extract All" on Windows; double-click on macOS.
              </li>
              <li>
                <strong className="text-white">.msg / .eml (saved emails)</strong> — a record of a
                specific piece of correspondence. Saving the email that confirms an agreed
                specification or a change request protects you if that agreement is ever disputed.
              </li>
            </ul>
          </ConceptBlock>

          <WorkedExample
            question="An architect emails you a .dwg file for a rewire and you do not own AutoCAD. Work through opening and using it."
            steps={[
              {
                calc: '1. Check the extension',
                note: '.dwg confirms it is an AutoCAD drawing, not a general image — do not try to open it in a photo viewer.',
              },
              {
                calc: '2. Use a free viewer',
                note: 'A free CAD viewer opens .dwg files for viewing, measuring and printing without needing a paid AutoCAD licence.',
              },
              {
                calc: '3. Check the layers',
                note: 'CAD drawings are usually built in layers — electrical, structural, plumbing. Toggle off what you do not need so the electrical layout is legible.',
              },
              {
                calc: '4. Export what you need to send back',
                note: 'Export a PDF of the relevant view rather than sending the .dwg back edited — not everyone downstream has a viewer that can open it, and a PDF cannot silently be re-edited.',
              },
            ]}
            answer="Free viewer to open and read it, PDF export for anything you send onward — you never need to buy CAD software just to receive drawings."
            watchOut="Do not judge the file 'broken' because your photo app or word processor refuses to open it. A .dwg file opening a wall of garbled text is completely normal in the wrong application; it means you need the right tool, not that the file is corrupt."
          />

          <TryIt
            question="A client forwards you four files ahead of a job: Drawings.zip (a folder of floor plans), MaterialsList.xlsx (their preferred fittings), Notes.jpg (a photo of a handwritten sketch), and UpdatedQuote.exe, which they say is 'the revised quote.' Work through what each needs, and what you should not do."
            steps={[
              {
                calc: '1. Drawings.zip',
                note: 'A compressed archive, not a document — extract it first, then open each drawing inside with whatever opens its own extension.',
              },
              {
                calc: '2. MaterialsList.xlsx',
                note: 'Any spreadsheet application — Excel or the free LibreOffice Calc both open it identically.',
              },
              {
                calc: '3. Notes.jpg',
                note: 'Any image viewer. It is a picture of a sketch, not an editable drawing — treat it as a reference, not something to mark up directly.',
              },
              {
                calc: '4. UpdatedQuote.exe',
                note: 'Do not open it. .exe is an executable program, not a document format any legitimate business sends as a quotation — a common way malicious software is disguised as an attachment.',
              },
            ]}
            answer="Extract the zip before viewing its contents, open the spreadsheet and image normally — and never run the .exe. No genuine quote, certificate or drawing is ever a program file; reply and ask for it as a PDF."
            nonCalculator
          />

          <InlineCheck
            id="m3s1-file-types"
            question="You need to send a completed EICR to a client. Which file format should you use to ensure the document looks identical on their device?"
            options={[
              '.docx — so they can edit it',
              '.pdf — preserves formatting and prevents accidental changes',
              '.xlsx — for spreadsheet compatibility',
              '.jpg — as an image of the document',
            ]}
            correctIndex={1}
            explanation="PDF is the correct format for official electrical certificates and reports. It preserves exact formatting across devices and operating systems and stops the recipient from accidentally modifying the content — that is the whole reason it is the industry standard for compliance documentation."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Cloud storage solutions</ContentEyebrow>

          <ConceptBlock
            title="A working tool, not an accident: decide what syncs, what stays local, what gets shared"
            onSite="If your laptop breaks or is stolen and your files were only ever local, they are gone with it. If they were synchronised, they are one login away on any device."
          >
            <p>
              Cloud storage keeps your files on secure servers maintained by companies like
              Microsoft, Google or Apple, in addition to — or instead of — a single local device.
              Save a file to a synchronised folder and it uploads automatically, then appears on
              every other device signed into the same account. Take a photo on site with your phone
              and it can be sitting on your office computer before you have finished the job.
            </p>
            <p>
              <strong className="text-white">Popular services:</strong>
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <strong className="text-white">Microsoft OneDrive</strong> — 5 GB free, 1 TB with a
                Microsoft 365 subscription. Integrates with Windows, Word, Excel and Outlook.
              </li>
              <li>
                <strong className="text-white">Google Drive</strong> — 15 GB free. Strong for
                real-time collaboration — a shared folder colleagues can view or edit as you both
                work in it.
              </li>
              <li>
                <strong className="text-white">Apple iCloud</strong> — 5 GB free, paid plans up to
                12 TB. Best on iPhone, iPad and Mac together — a phone photo is available on the Mac
                automatically.
              </li>
              <li>
                <strong className="text-white">Dropbox</strong> — 2 GB free. Reliable and simple,
                with a "Smart Sync" option that shows every file without storing them all locally.
              </li>
            </ul>
            <p>
              Not everything in a job folder belongs in the same place, and deciding that
              deliberately — rather than by accident — is the actual skill. Sync anything that is
              evidence or a record, for the off-site protection and availability on every device.
              Share only what the client is entitled to see, and at the right permission — most
              services offer "view only" for a certificate, "can edit" for a colleague, and an
              expiry date for anything that should not stay accessible indefinitely. Anything that
              is not this job's business at all — another client's figures, a stray personal file —
              does not belong in the sync at any level.
            </p>
            <p>
              A related decision is what stays available offline. Most cloud storage apps let you
              mark files or folders "available offline," downloading them in advance so they still
              open with no signal, then re-synchronising once a connection returns — mark the job
              folder before you leave the office with a signal, not once you have arrived without
              one.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You are tidying a job folder before archiving it: it holds the signed EICR PDF, 40 raw site photos, a live spreadsheet you are still updating for pricing on an unrelated job, and a personal photo that landed in the folder by accident from your phone. Decide, file by file, what syncs, what stays local, and what must be shared with the client."
            steps={[
              {
                calc: '1. Signed EICR PDF',
                note: 'Syncs — it is the compliance record, it needs the off-site copy — and is shared with the client, as a view-only link.',
              },
              {
                calc: '2. 40 raw site photos',
                note: 'Syncs for backup value — evidence you may need years later — but is not shared with the client unless they specifically asked for progress photos.',
              },
              {
                calc: '3. Unrelated pricing spreadsheet',
                note: "Belongs nowhere near this job at all. A different client's figures inside this client's folder is a mistake to fix before archiving, not a sync-versus-local decision.",
              },
              {
                calc: '4. Personal photo',
                note: 'Delete it from the job folder. It has no work purpose there, synced or not.',
              },
            ]}
            answer="Sync what is evidence or a record; share only what the client is entitled to see, at the permission level they need; and anything that is not this job's business does not belong in the folder to begin with."
          />

          <TryIt
            question="A different job folder holds: a draft quotation not yet sent, before-and-after photos of a consumer unit change the client specifically wants for their home insurance, a supplier's invoice for the materials used, and a note you saved about a spec change agreed verbally on site. Work through the same three-way decision for this set."
            steps={[
              {
                calc: '1. Draft quotation',
                note: "Stays local until finalised and sent — a draft in the client's hands is a version you no longer control.",
              },
              {
                calc: '2. Before-and-after photos',
                note: 'Syncs and is shared — the client asked for these by name, for a specific purpose.',
              },
              {
                calc: '3. Supplier invoice',
                note: 'Syncs as a business record, but is not shared with the client — it is not their business what you pay a supplier.',
              },
              {
                calc: '4. Spec-change note',
                note: 'Syncs as a record protecting you if the change is disputed, but is not shared unless asked — it exists for your own protection first.',
              },
            ]}
            answer="The pattern repeats: sync anything that is a record, share only what was actually requested or is owed to the client, and keep supplier and pricing detail to yourself."
            nonCalculator
          />

          <Scenario
            title="Sharing a certificate the client can view but not change"
            situation="A client wants a copy of their EICR emailed over, but you also want to retain full editing rights on the working file in case a correction is needed before the final version is issued."
            whatToDo="Share the completed PDF via a cloud link set to 'view only', with an expiry date if the service supports one, rather than attaching an editable copy or granting shared edit access to your working folder. A view-only link protects the record from being altered downstream while still getting the client their copy immediately."
            whyItMatters="An editable copy in a client's hands is a version of the certificate you no longer fully control. If a dispute ever arose about what the certificate actually said, having issued a locked, view-only PDF is the version you can defend."
          />

          <CommonMistake
            title="Treating cloud sync as a complete backup on its own"
            whatHappens="A file gets accidentally deleted, and because it was in a synchronised folder, the deletion propagates to every device and to the cloud copy too. 'It's in the cloud' turns out not to have protected against the one thing that actually happened."
            doInstead="Check what your cloud service's deleted-items retention actually is (commonly around 30 days) and know that it is a safety net, not a substitute for the 3-2-1 rule in Section 06. Cloud sync is your off-site copy; it is not automatically your only backup."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · File naming conventions</ContentEyebrow>

          <ConceptBlock
            title="One convention, applied without exception: date, client, document type"
            plainEnglish="YYYY-MM-DD sorts oldest to newest in any file manager on any system. Any other date order does not."
          >
            <p>
              A consistent naming convention is one of the simplest habits that pays off for years.
              With hundreds of certificates and photographs accumulated, being able to find the
              right one in seconds rather than minutes matters every single time you need it — and
              it matters most during an audit or a dispute, exactly when you have the least patience
              for a slow search.
            </p>
            <p>
              <strong className="text-white">The format:</strong>{' '}
              <code className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                YYYY-MM-DD_ClientOrSite_DocumentType.ext
              </code>
            </p>
            <p>
              Starting with the year, then month, then day means files sort chronologically
              regardless of the system's regional date settings — DD-MM-YYYY or MM-DD-YYYY do not
              sort correctly once you have files that cross a year boundary, because a file manager
              sorts by the characters it sees, left to right, not by the calendar.
            </p>
            <p>
              Never use spaces, slashes, colons, asterisks or question marks in a file name — use
              underscores or hyphens instead. Some systems and cloud services cannot handle certain
              special characters at all, which can make a file inaccessible or corrupt it in
              transfer.
            </p>
            <p>
              When a document genuinely needs more than one version, use a numbered suffix — _v1,
              _v2, _v3 — never "final", "final2" or "FINAL_REALLY_FINAL". A numbered suffix has an
              unambiguous highest number; the word "final" repeated with increasing desperation does
              not tell anyone which file is actually current. For a collaborative document, add
              initials after the version: _v2_AM.
            </p>
            <p>
              Site photographs are the worst offenders, because a phone names them automatically
              with a meaningless timestamp like IMG_20250703_143022.jpg. Rename them as soon as
              possible, ideally before you leave site:{' '}
              <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">
                2025-07-03_OakfieldSchool_Photo_DB-Before.jpg
              </code>
              . Most cloud storage apps let you rename directly from the phone, so there is no
              excuse for waiting until you are back at a desk and have forgotten which photo shows
              what.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A colleague hands you a file named 'Rewire Quote FINAL (2) - johns copy.docx', for a job at Oakfield School quoted on 3 July 2025. Rework the name into the standard convention."
            steps={[
              {
                calc: '1. Find the date',
                note: '3 July 2025 → 2025-07-03. Year first, always two digits for month and day.',
              },
              {
                calc: '2. Find the client or site',
                note: '"Oakfield School" — the actual site, not "johns copy", which identifies a person, not the job.',
              },
              {
                calc: '3. Find the document type',
                note: '"Quotation" — plain and specific, not "FINAL" or "(2)", which describe a version, not a document type.',
              },
              {
                calc: '4. Strip the version chaos',
                note: '"FINAL (2)" tells you nothing about which one is actually current. If a version is genuinely needed, it becomes a suffix: _v2.',
              },
              {
                calc: '5. Assemble with underscores, no spaces',
                note: '2025-07-03_OakfieldSchool_Quotation.docx',
              },
            ]}
            answer="2025-07-03_OakfieldSchool_Quotation.docx — sorts correctly, tells you what it is without opening it, and has no ambiguous version marker."
            watchOut="'johns copy' in the original name is exactly the kind of detail that feels meaningful on the day and useless six months later. Names should describe the document, not who happened to be holding it when it was saved."
          />

          <WorkedExample
            question="Three badly-named files land in the same folder this week. Rename all three, applying the same method to each in turn: 'IMG_20260910_091533.jpg' (a before photo of the consumer unit, job for a client called Hodgson, 10 September 2026); 'eicr draft v2 (1).pdf' (the EICR for that same Hodgson job, still being finalised); 'Untitled spreadsheet.xlsx' (a cable calculation for a different client, Whitfield, dated 11 September 2026)."
            steps={[
              {
                calc: '1. IMG_20260910_091533.jpg',
                note: 'The timestamp is meaningless to a person; the date, client and document type are not. Becomes 2026-09-10_Hodgson_Photo_DB-Before.jpg.',
              },
              {
                calc: '2. eicr draft v2 (1).pdf',
                note: 'Same job, same date — but this genuinely is a second draft, so the version suffix is kept, not stripped. Becomes 2026-09-10_Hodgson_EICR_v2.pdf.',
              },
              {
                calc: '3. Untitled spreadsheet.xlsx',
                note: '"Untitled" is the one thing every default save name has in common with every other file, and the one thing that tells you nothing. Becomes 2026-09-11_Whitfield_CableCalc.xlsx.',
              },
              {
                calc: '4. Check the result',
                note: 'All three now sort by date and read by client at a glance, in place of a phone timestamp, an ambiguous "(1)", and a default application name.',
              },
            ]}
            answer="2026-09-10_Hodgson_Photo_DB-Before.jpg, 2026-09-10_Hodgson_EICR_v2.pdf, 2026-09-11_Whitfield_CableCalc.xlsx — three unrelated messes fixed by the same method, one file at a time."
            watchOut="Not every version marker is chaos to strip out — the EICR's _v2 was kept because it is a genuine, current draft number. The rule is 'delete every version word that does not tell you which file is current', not 'delete every version word'."
          />

          <TryIt
            question="A fourth file turns up from the same week: 'scan0001.pdf', a scanned certificate of conformity for switchgear bought for a job at Merrow Industrial Estate, scanned on 12 September 2026. Rename it using the same method."
            steps={[
              { calc: '1. Find the date', note: '12 September 2026 in YYYY-MM-DD form.' },
              {
                calc: '2. Find the client or site',
                note: 'The site the switchgear is going into, not the supplier who issued the scanned certificate.',
              },
              {
                calc: '3. Find the document type',
                note: 'What the document actually is, spelled out — not "scan" and a number.',
              },
              {
                calc: '4. Assemble it',
                note: 'Date, then site, then document type, joined with underscores.',
              },
            ]}
            answer="2026-09-12_MerrowIndustrialEstate_CertificateOfConformity.pdf — the scanner's default name carried no information a search or a sort could use; this one does."
            nonCalculator
          />

          <CommonMistake
            title="Naming files by how it feels rather than by the convention"
            whatHappens="A rushed save produces 'scan1.pdf', or a genuinely careful save still produces something inconsistent with every other file in the folder, because the convention was applied loosely rather than every time. Six months later, half the folder sorts correctly and half does not, and search stops being reliable."
            doInstead="Apply the convention on every save, without exception, from day one of your apprenticeship. It costs two extra minutes per file and it is the entire reason search (Section 01) and the folder structure (Section 05) work at all — a perfect folder structure with badly named files inside it is still a mess."
          />

          <InlineCheck
            id="m3s1-naming"
            question="Which file naming format ensures documents sort chronologically in any file manager?"
            options={[
              'DD-MM-YYYY_Client_DocType.pdf',
              'Client_DD-MM-YYYY_DocType.pdf',
              'YYYY-MM-DD_Client_DocType.pdf',
              'DocType_Client_YYYY.pdf',
            ]}
            correctIndex={2}
            explanation="YYYY-MM-DD (ISO 8601) sorts in chronological order regardless of the operating system or regional settings, because the year is the leftmost — and therefore the most significant — part of the string a file manager compares first."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Folder organisation</ContentEyebrow>

          <ConceptBlock
            title="A numbered top level, with a consistent template inside every job"
            onSite="Six folders, numbered, at the top level. The year lives one level down, inside Completed Jobs — not at the top, where it would push everything else down a level for no benefit."
          >
            <p>
              A well-organised folder structure is the digital equivalent of a tidy tool bag —
              everything has a place, and you find it without rummaging. The recommended top level:
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <strong className="text-white">01_Active_Jobs/</strong> — every current job, one
                subfolder per job.
              </li>
              <li>
                <strong className="text-white">02_Completed_Jobs/</strong> — finished jobs, and this
                is where the year lives: 2025/SmithResidence/, 2026/OakfieldSchool/, and so on.
              </li>
              <li>
                <strong className="text-white">03_Templates/</strong> — reusable certificate,
                quotation and RAMS templates.
              </li>
              <li>
                <strong className="text-white">04_Training_CPD/</strong> — course materials, CPD
                certificates, revision notes.
              </li>
              <li>
                <strong className="text-white">05_Business/</strong> — insurance, registrations,
                company documents.
              </li>
              <li>
                <strong className="text-white">06_Technical_References/</strong> — BS 7671
                amendments, manufacturer datasheets, wiring diagrams.
              </li>
            </ul>
            <p className="mt-3">
              Numbering the top-level folders forces this fixed order instead of leaving it to
              alphabetical accident, and it means the year sits exactly one level down from
              Completed_Jobs — where it becomes useful once a job is finished — rather than at the
              very top, where it would make every listing start with a run of years.
            </p>
            <p>
              Within each active job folder, use the same numbered subfolders every time, so every
              job looks the same and you never have to think about where something should go:
            </p>
            <p className="mt-2">
              <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">
                01_Quotation/ · 02_Drawings/ · 03_Calculations/ · 04_Certificates/ · 05_Photos/ ·
                06_Correspondence/ · 07_Invoices/
              </code>
            </p>
            <p className="mt-3">
              Avoid nesting more than 4–5 levels deep, and avoid duplicating files across multiple
              locations, which leads directly to version confusion about which copy is current.
              Where you genuinely need the same file reachable from two places, use a shortcut
              (Windows) or an alias (macOS) rather than a second physical copy.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You finish a rewire for the Ainsworth family, completed 12 September 2026, currently sitting in 01_Active_Jobs/Ainsworth_Rewire/. Work through archiving it correctly."
            steps={[
              {
                calc: '1. Confirm the job is genuinely finished',
                note: 'Certificate issued, invoice raised, nothing outstanding — archiving is a one-way move in practice, so do not do it early.',
              },
              {
                calc: '2. Locate the destination',
                note: '02_Completed_Jobs/2026/ — the year subfolder for the year the job was completed, creating it if this is the first job finished that year.',
              },
              {
                calc: '3. Move the whole job folder, not selected files',
                note: 'The folder keeps its internal structure (Quotation, Drawings, Certificates, Photos…) intact, so nothing has to be re-sorted at the destination.',
              },
              {
                calc: '4. Rename only if the folder name is unclear',
                note: 'Ainsworth_Rewire is fine as it stands; it does not need the date repeated since it now sits inside the correct year.',
              },
              {
                calc: '5. Remove it from Active Jobs',
                note: 'A move, not a copy — leaving a duplicate behind recreates the version-confusion problem this structure exists to avoid.',
              },
            ]}
            answer="02_Completed_Jobs/2026/Ainsworth_Rewire/ — filed once, in the year it was completed, with nothing left behind in Active Jobs."
            watchOut="Do not invent a new folder name mid-move because it feels tidier. Consistency across hundreds of jobs matters more than any single folder looking slightly better organised on its own."
          />

          <CommonMistake
            title="Saving everything to the desktop or Downloads folder"
            whatHappens="Files pile up outside the structure entirely because saving to whatever folder is already open feels quicker in the moment. Within a few months there is a second, disorganised filing system running alongside the real one, and nobody — including you — knows which one has the current version of anything."
            doInstead="Navigate to the correct job folder before saving, every time, even when it takes an extra few seconds. If a file lands in the wrong place by habit, move it to its proper folder before you close the application, while you still remember what it was."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Backup strategies</ContentEyebrow>

          <ConceptBlock
            title="Data loss is a 'when', not an 'if' — the 3-2-1 rule, and the tools that run it automatically"
            onSite="A backup you have never tested is not a backup — it is an assumption. Test the restore, not just the save."
          >
            <p>
              Hard drives fail, laptops get stolen from vans, phones get dropped on site, and
              ransomware can encrypt an entire drive overnight. For an electrician, losing
              certificates and job records has real professional consequences, which is why a backup
              strategy is not optional admin.
            </p>
            <p>
              <strong className="text-white">The 3-2-1 rule</strong> is the standard to work to:{' '}
              <strong className="text-white">3 copies</strong> of every important file (the original
              plus two backups), on <strong className="text-white">2 different media types</strong>{' '}
              (your computer's drive and an external drive, or your computer and the cloud), with{' '}
              <strong className="text-white">1 copy stored off-site</strong> — cloud storage, or an
              external drive kept somewhere other than where the computer lives.
            </p>
            <p>Four tools do most of this automatically, once configured:</p>
            <ul className="mt-2 space-y-2">
              <li>
                <strong className="text-white">Windows Backup / File History</strong> — built into
                Windows, backing up files to an external drive at set intervals, running silently
                once configured.
              </li>
              <li>
                <strong className="text-white">macOS Time Machine</strong> — hourly backups for the
                last day, daily for the last month, weekly beyond that. Plug in a drive and it runs
                itself.
              </li>
              <li>
                <strong className="text-white">Cloud sync</strong> — OneDrive, Google Drive and
                similar count as your off-site copy, but an accidental deletion can synchronise too,
                so sync alone is not the whole 3-2-1 strategy (Section 03).
              </li>
              <li>
                <strong className="text-white">An external drive</strong> — a USB drive or SSD gives
                a fast, affordable local backup. Keep one at home and, where practical, one
                somewhere else entirely.
              </li>
            </ul>
          </ConceptBlock>

          <WorkedExample
            question="Your laptop is stolen from your van overnight. It held every job folder locally, but you also sync to a cloud account. Work through what you do next, in order."
            steps={[
              {
                calc: '1. Do not panic about the data first',
                note: 'If the affected folders were syncing to the cloud, the files themselves are almost certainly safe — that is the entire point of the 1 in 3-2-1.',
              },
              {
                calc: '2. Log into the cloud account from another device',
                note: 'A phone, a tablet, or any other computer — confirm the job folders are present and current before assuming the worst.',
              },
              {
                calc: '3. Check anything that was NOT synced',
                note: 'A folder deliberately kept local-only for space reasons is not protected by cloud sync — this is where an external off-site backup, if one existed, is the only remaining copy.',
              },
              {
                calc: '4. Secure the account',
                note: "Change the account password and revoke the stolen device's access from the cloud service's device list, so anyone who gets into the laptop cannot also reach the live cloud account.",
              },
              {
                calc: '5. Report it',
                note: 'To the police for the theft itself, and to your insurer if the laptop is covered — separate from, and secondary to, confirming the data is safe.',
              },
            ]}
            answer="Confirm the cloud copy first, secure the account second, replace the hardware last — the laptop is the cheap part to replace."
            watchOut="The panic response is to worry about the laptop before the data. Get the order right: data safety, account security, hardware replacement — reversing that order is how people waste the first anxious hour on the least important part."
          />

          <TryIt
            question="You set up an external drive backup six months ago and have never checked it since. Work through testing that it actually works, before you need to rely on it."
            steps={[
              {
                calc: '1. Pick one real file',
                note: 'Something you would actually miss — a recent certificate, not a random test file.',
              },
              {
                calc: '2. Restore it from the backup, to a different location',
                note: 'Not back over the original — that would only prove the drive contains a file, not that a genuine restore works.',
              },
              {
                calc: '3. Open it and check it is complete and current',
                note: 'A corrupted or out-of-date restore is worse than no backup, because it creates false confidence.',
              },
              {
                calc: '4. Check the backup date',
                note: 'If the most recent backup is weeks or months old, the schedule has silently stopped running and needs fixing now, not the day you need it.',
              },
            ]}
            answer="A monthly test restore is the only way to know a backup is actually working — the failure mode for a broken backup is silence, not an error message."
            nonCalculator
          />

          <CommonMistake
            title="Setting up a backup once and never testing it again"
            whatHappens="A backup schedule is configured, feels done, and is never checked again. Months or years later, the day it is actually needed, it turns out the drive filled up, the software silently stopped, or the sync had been failing quietly the whole time — and there is no way to know that until it is too late to matter."
            doInstead="Test a restore once a month, as in the TryIt above. It takes minutes and it is the only way a backup earns the word 'backup' rather than 'assumption'."
          />

          <InlineCheck
            id="m3s1-backup"
            question="Your laptop is stolen from your van overnight. You use OneDrive to sync your files. What is the status of your data?"
            options={[
              'All data is permanently lost',
              'Your files are safe in the cloud — log in from any device to access them',
              'Only files created today are lost',
              'You need to contact Microsoft to recover them',
            ]}
            correctIndex={1}
            explanation="Because the files were synchronised to OneDrive, they exist on Microsoft's servers independently of the stolen laptop. Logging into OneDrive from any other device gives immediate access to everything — which is exactly why cloud sync, treated correctly as one leg of the 3-2-1 rule, is essential rather than a nice-to-have."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Keyboard shortcuts</ContentEyebrow>

          <ConceptBlock
            title="Five shortcuts cover most of a working day; the file manager and browser add a few more"
            plainEnglish="Ctrl+S, Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+F. Learn those five before any others — everything else is a bonus."
          >
            <p>
              Shortcuts eliminate the need to hunt through menus with a mouse for something you do
              dozens of times a day. The essentials, Windows first and macOS second where they
              differ:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Ctrl+S / Cmd+S</strong> — Save. A crash or a power
                cut costs nothing if you press it regularly.
              </li>
              <li>
                <strong className="text-white">Ctrl+C / Cmd+C</strong> — Copy.
              </li>
              <li>
                <strong className="text-white">Ctrl+V / Cmd+V</strong> — Paste. Useful for
                transferring readings between documents without retyping.
              </li>
              <li>
                <strong className="text-white">Ctrl+X / Cmd+X</strong> — Cut.
              </li>
              <li>
                <strong className="text-white">Ctrl+Z / Cmd+Z</strong> — Undo. Repeatable to step
                back through several actions.
              </li>
              <li>
                <strong className="text-white">Ctrl+A / Cmd+A</strong> — Select all.
              </li>
              <li>
                <strong className="text-white">Ctrl+F / Cmd+F</strong> — Find text inside a document
                or webpage — quicker than scrolling a long BS 7671 PDF for one regulation.
              </li>
              <li>
                <strong className="text-white">Alt+Tab / Cmd+Tab</strong> — Switch between open
                applications without touching the mouse.
              </li>
            </ul>
            <p className="mt-3">
              In the file manager: <strong className="text-white">F2</strong> renames the selected
              file (faster than right-click → Rename),{' '}
              <strong className="text-white">Ctrl+Shift+N</strong> (Windows) or{' '}
              <strong className="text-white">Cmd+Shift+N</strong> (macOS) creates a new folder, and{' '}
              <strong className="text-white">Delete</strong> /{' '}
              <strong className="text-white">Cmd+Backspace</strong> moves a file to the Recycle Bin
              or Trash rather than removing it permanently.
            </p>
            <p>
              In a browser, useful for online certification platforms and regulation lookups:{' '}
              <strong className="text-white">Ctrl+T / Cmd+T</strong> opens a new tab,{' '}
              <strong className="text-white">Ctrl+W / Cmd+W</strong> closes the current one, and{' '}
              <strong className="text-white">Ctrl+Shift+T / Cmd+Shift+T</strong> reopens the last
              tab you closed.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You need to copy five site photos from Downloads into the current job's Photos subfolder, then rename the EICR PDF you just saved so it is ready to email. Work through it once with the mouse, counting every action, then again with shortcuts."
            steps={[
              {
                calc: 'Mouse route — copy the photos',
                note: 'Right-click the selection → click "Copy" (2 actions), right-click the destination → click "Paste" (2 actions). 4 actions before you have even touched the certificate.',
              },
              {
                calc: 'Mouse route — rename the EICR',
                note: 'Right-click the file → click "Rename" (2 actions), type the new name, click elsewhere to confirm it (2 actions). Mouse route total: 8 actions.',
              },
              {
                calc: 'Shortcut route — copy the photos',
                note: 'Ctrl+C, then Ctrl+V (Cmd+C, Cmd+V on a Mac) — 2 actions, no menu to open or read.',
              },
              {
                calc: 'Shortcut route — rename the EICR',
                note: 'F2 starts the rename directly, no right-click and no menu — type the new name, press Enter. Shortcut route total: 4 actions.',
              },
            ]}
            answer="Same result, half the actions: 8 with the mouse against 4 with shortcuts."
            watchOut="The saving is not really the half-second per action — it is that a menu forces you to stop and read it, where a shortcut is committed to muscle memory and needs no attention at all. That gap compounds over a full day of touching files constantly."
          />

          <TryIt
            question="You have just spent twenty minutes filling in a long test schedule in a browser tab, and your finger slips, closing the tab before you saved anything. Work through your recovery, in order."
            steps={[
              {
                calc: '1. Do not close the browser itself',
                note: 'Closing the whole application can clear the very history that lets you recover the tab.',
              },
              {
                calc: '2. Press Ctrl+Shift+T / Cmd+Shift+T',
                note: 'Reopens the most recently closed tab, restoring the page as it was.',
              },
              {
                calc: '3. Check whether the form data survived',
                note: 'Some web applications hold unsaved form state in the page itself; others do not, and the reopened tab loads fresh.',
              },
              {
                calc: '4. If it did not survive, check for an autosave or draft',
                note: 'Many certification platforms autosave periodically — check before assuming twenty minutes is gone entirely.',
              },
            ]}
            answer="Ctrl+Shift+T recovers the tab; whether it recovers the data depends on whether the application autosaves, which is exactly why Ctrl+S habits and checking for autosave indicators matter as much as the shortcut itself."
            nonCalculator
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Troubleshooting common issues</ContentEyebrow>

          <ConceptBlock
            title="Restart first, always — then work through causes cheapest and most likely first"
            onSite="Restarting a computer, a router or a printer clears whatever has gone quietly wrong in the background. It is the first move, not an admission of defeat."
          >
            <p>
              You do not need to be an IT specialist to resolve most day-to-day computer problems.
              The method is always the same: check the cheapest, most likely cause first, and only
              move to the next, more disruptive check once the previous one has ruled itself out. A
              handful of common issues cover almost everything you will actually encounter:
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <strong className="text-white">Slow performance</strong> — check Task Manager
                (Ctrl+Shift+Esc) or Activity Monitor, close what you do not need, restart if it
                persists. Longer term: an SSD upgrade, more RAM, or removing unused software.
              </li>
              <li>
                <strong className="text-white">A file will not open</strong> — usually the correct
                application is not installed. Check the extension (Section 02): .dwg needs a CAD
                viewer, .xlsx needs a spreadsheet application; LibreOffice or a free CAD viewer
                covers most cases.
              </li>
              <li>
                <strong className="text-white">Wi-Fi will not connect</strong> — toggle Wi-Fi off
                and on, restart the router (unplugged for 30 seconds), forget the network and
                reconnect with the password again, and check whether another device has the same
                problem.
              </li>
              <li>
                <strong className="text-white">Storage full warning</strong> — empty the Recycle Bin
                or Trash, clear Downloads, and move large files — especially photos and videos — to
                cloud storage or an external drive rather than deleting anything you might need.
              </li>
              <li>
                <strong className="text-white">Lost or deleted files</strong> — check the Recycle
                Bin / Trash first; deleted files sit there until emptied. If the file was in a
                synchronised cloud folder, check that service's own "Deleted" area, typically
                retained around 30 days.
              </li>
            </ul>
          </ConceptBlock>

          <WorkedExample
            question="A client is ready to sign a paper copy of an EICR before you leave, and the printer will not respond. Work through it as a decision tree: the symptom, what you check first, what that rules out, and the next check if it does not fix it."
            steps={[
              { calc: 'Symptom', note: 'Printer unresponsive — nothing prints, no error shown.' },
              {
                calc: 'First check: power and connection',
                note: 'Confirm it is switched on and the USB cable or Wi-Fi connection is actually active — the single most common cause, and it costs seconds to check.',
              },
              {
                calc: 'If that rules it out: check for a paper jam',
                note: 'Power and connection both fine narrows the fault to something mechanical or in the queue — open the tray and check the paper path before assuming software.',
              },
              {
                calc: 'If that rules it out: open the print queue',
                note: 'No jam points to a stuck job sitting ahead of yours — Settings → Printers, clear anything stuck.',
              },
              {
                calc: 'If that rules it out: restart the printer and the computer',
                note: "Clears whatever has gone wrong silently in either device's memory — the same universal fix as everywhere else in this section.",
              },
              {
                calc: 'If it STILL fails: reinstall the driver',
                note: "From the manufacturer's website. A corrupted driver is the least likely cause of the five, which is exactly why it is the last check, not the first.",
              },
            ]}
            answer="Five checks in order, cheapest and most likely first: power/connection, jam, queue, restart, driver — not straight to the last, most disruptive option."
            watchOut="Do not skip straight to reinstalling the driver because it 'feels' more technical. Most printer failures are the boring first two causes, and reinstalling a driver you did not need to touch can introduce a new problem where there was not one before."
          />

          <Scenario
            title="Storage full, mid-report, with photos still to upload"
            situation="You are on site finishing an EICR with photo evidence still to attach, and the tablet warns that storage is almost full."
            whatToDo="Do not delete anything yet. First check what is actually taking the space — usually an accumulation of old photos never moved off the device — and offload anything already backed up to cloud storage or synced, freeing space without risking a file you have not confirmed is safe elsewhere. Only delete once you have confirmed a copy exists somewhere else."
            whyItMatters="Deleting under time pressure, without confirming a backup exists, is exactly how installation photos — evidence you may need years later — get lost permanently. The ten extra seconds spent checking a sync status is cheap insurance against a much worse afternoon."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Learn your OS layout once — desktop, file manager, search, settings — and use search rather than browsing to find files fast.',
              'A file extension tells you which application to use: PDF for anything official, .dwg for drawings, .xlsx for calculations and schedules — and never run a file that arrives as a program (.exe) claiming to be a document.',
              'Cloud storage is a working tool. Decide deliberately what syncs, what stays local, and what actually gets shared with a client, rather than letting all three happen by default.',
              'One naming convention, applied every time: YYYY-MM-DD_Client_DocumentType.pdf. Version numbers (_v1, _v2), never "final" repeated.',
              'A numbered top-level folder structure (Active Jobs, Completed Jobs, Templates…) beats alphabetical or year-first once real job volume tests it — the year belongs inside Completed Jobs, not at the top.',
              'Certificates are kept for at least the life of the installation. There is no single statutory figure that covers every certificate type, so that is the position to work to, not an arbitrary year count.',
              'The 3-2-1 backup rule — 3 copies, 2 media, 1 off-site — protects against exactly the failure that matters: a stolen laptop, a dead drive, a house fire.',
              'A backup that has never been restored and tested is an assumption, not a backup. Test one file a month.',
              'Five shortcuts cover most of a working day and roughly halve the actions needed for routine file handling: Ctrl+S, Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+F.',
              'The universal troubleshooting step is restart. After that, work cheapest and most likely first, every time — do not skip to the most disruptive fix because it feels more technical.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Do I need to buy premium cloud storage from day one?',
                answer:
                  'No. The free tiers (5 GB on OneDrive and iCloud, 15 GB on Google Drive, 2 GB on Dropbox) are enough to start a proper naming and folder habit. Upgrade when the volume of certificates and photos actually needs it, not in advance of needing it.',
              },
              {
                question: 'What if my company already has a folder structure I am told to use?',
                answer:
                  "Use theirs. The structure in Section 05 is a sound default for building your own system, not a rule that overrides an employer's existing convention. What matters more than which exact structure you use is that you use one consistently, and that you apply the naming convention inside it.",
              },
              {
                question: 'Is cloud storage secure enough for client data and certificates?',
                answer:
                  'Mainstream services from Microsoft, Google, Apple and Dropbox encrypt data in transit and at rest, and are used for sensitive documents across many industries. The bigger practical risk is usually a weak account password or sharing a link with the wrong permission level, not the storage itself.',
              },
              {
                question: 'How long do I actually have to keep electrical certificates?',
                answer:
                  'There is no single figure that applies to every certificate type. The defensible position is to keep records for at least the life of the installation — an installation still standing decades later can still generate a reasonable request to see its paperwork, and "I kept it for a fixed number of years and then deleted it" is a weaker position than simply retaining it.',
              },
              {
                question: 'My laptop is old and slow — should I just replace it?',
                answer:
                  'Only after trying the free steps first: closing unused programs, restarting, clearing storage, and checking whether an SSD upgrade or added RAM would fix it for a fraction of the cost of a new machine. Buying new hardware is the last step in the troubleshooting order, not the first.',
              },
            ]}
          />

          <SectionRule />

          <Quiz
            questions={quizQuestions}
            title="Section 1: Computer Basics & File Management Quiz"
          />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate('/study-centre/apprentice/functional-skills/module3')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Module 3
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module3/section2')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Section 2
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule3Section1;
