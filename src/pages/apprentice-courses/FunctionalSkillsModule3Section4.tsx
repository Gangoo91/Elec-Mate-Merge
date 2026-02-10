import { ArrowLeft, ArrowRight, ShieldCheck, Mail, AlertTriangle, KeyRound, Scale, Share2, Video, Heart } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule3Section4 = () => {
  useSEO(
    "Section 4: Online Safety & Communication - Digital Skills for Electricians",
    "Master email etiquette, phishing awareness, password security, GDPR obligations, social media best practice, video conferencing, online training platforms, and digital wellbeing for electrical professionals."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "You receive an email claiming to be from your electrical wholesaler asking you to verify your account by clicking a link. The email address is support@electrcal-wholesale-uk.com (note the misspelling). What should you do?",
      options: [
        "Click the link immediately — it looks urgent",
        "Forward it to all your colleagues as a warning",
        "Do not click the link — this is likely a phishing attempt. Contact the wholesaler directly using their known phone number or website",
        "Reply to the email asking if it is genuine"
      ],
      correctAnswer: 2,
      explanation: "This is a classic phishing attempt. The misspelled domain name ('electrcal' instead of 'electrical') is a red flag. Never click links in suspicious emails. Instead, contact the company directly using contact details from their genuine website or your existing records — not the contact details in the suspicious email. Replying confirms your email address is active, which invites more phishing."
    },
    {
      id: 2,
      question: "Under GDPR, how long can you retain a customer's personal data (name, address, contact details) after completing their electrical work?",
      options: [
        "Forever — once you have it, it is yours",
        "Only as long as there is a legitimate business reason, such as warranty obligations, legal requirements, or ongoing service agreements",
        "Exactly 30 days after the last invoice",
        "Personal data cannot be stored under any circumstances"
      ],
      correctAnswer: 1,
      explanation: "GDPR requires that personal data is retained only for as long as there is a legitimate purpose. For electricians, this typically includes the warranty period, legal record retention requirements (electrical certificates should be kept for the life of the installation), and ongoing maintenance agreements. You should have a data retention policy and delete data when it is no longer needed."
    },
    {
      id: 3,
      question: "What is the recommended minimum length for a strong password?",
      options: [
        "4 characters",
        "6 characters",
        "8 characters",
        "12 characters or more"
      ],
      correctAnswer: 3,
      explanation: "Security experts recommend passwords of 12 characters or more. Longer passwords are exponentially harder to crack by brute force. A 12-character password using letters, numbers, and symbols would take billions of years to crack using current technology. Better still, use a passphrase — a series of random words like 'correct horse battery staple' — which is both long and memorable."
    },
    {
      id: 4,
      question: "Which of the following is the best practice for professional email communication with a client?",
      options: [
        "Use text speak and abbreviations to save time (e.g. 'ur rewire is done m8')",
        "Use a clear subject line, professional greeting, concise body text, and a signature block with your contact details and registration numbers",
        "Write entirely in capital letters to emphasise importance",
        "Include as many emoji as possible to seem friendly"
      ],
      correctAnswer: 1,
      explanation: "Professional emails should have a clear subject line (e.g. 'EICR Report — 14 Oak Street'), a proper greeting, concise and well-structured body text, and a signature block containing your name, company, phone number, email, and registration details (NICEIC/ELECSA number). This builds client confidence and presents a professional image."
    },
    {
      id: 5,
      question: "A customer posts a negative review about your work on social media. What is the best response?",
      options: [
        "Delete the review and block the customer",
        "Post an angry response defending yourself",
        "Respond politely and professionally, acknowledge their concern, and offer to discuss the matter privately to resolve it",
        "Ignore it completely and hope nobody sees it"
      ],
      correctAnswer: 2,
      explanation: "A professional, empathetic response demonstrates maturity and commitment to customer service. Acknowledge their concern, apologise for their experience, and offer to resolve the issue privately (by phone or in person). Potential customers reading the exchange will judge you more on how you handle the complaint than on the complaint itself. Never respond angrily — it damages your reputation far more than the original review."
    },
    {
      id: 6,
      question: "What is a password manager and why should electricians use one?",
      options: [
        "A person who remembers passwords for you",
        "Software that securely stores and generates unique, strong passwords for all your accounts, so you only need to remember one master password",
        "A feature that disables passwords on all devices",
        "A type of antivirus software"
      ],
      correctAnswer: 1,
      explanation: "A password manager (e.g. Bitwarden, 1Password, LastPass) generates and securely stores unique, strong passwords for every account. You only need to remember one master password. This eliminates the dangerous practice of reusing the same password across multiple sites. If one site is breached, your other accounts remain safe because each has a different password."
    },
    {
      id: 7,
      question: "Which of the following would constitute a GDPR breach if done by an electrician?",
      options: [
        "Sending a certificate to a client via email",
        "Sharing a customer's name, address, and phone number with a third party without their consent for marketing purposes",
        "Keeping a record of the work carried out at a property",
        "Taking photographs of your own completed electrical work"
      ],
      correctAnswer: 1,
      explanation: "Sharing personal data (name, address, phone number) with a third party for marketing purposes without the individual's explicit consent violates GDPR. The other options are legitimate business activities — sending certificates to the data subject, retaining records for legal compliance, and photographing your work (though photographs showing identifiable individuals would need consideration)."
    },
    {
      id: 8,
      question: "What is 'screen fatigue' and how can electricians manage it?",
      options: [
        "A physical crack in your phone screen from dropping it on site",
        "Tiredness, eye strain, and reduced concentration from prolonged screen use — managed through regular breaks, the 20-20-20 rule, and limiting non-essential screen time",
        "A type of computer virus",
        "When your phone battery runs out"
      ],
      correctAnswer: 1,
      explanation: "Screen fatigue (or digital eye strain) affects anyone who spends extended periods looking at screens. Symptoms include tired eyes, headaches, neck pain, and difficulty concentrating. The 20-20-20 rule helps: every 20 minutes, look at something 20 feet away for 20 seconds. Also, take regular breaks from screens, adjust brightness to match your environment, and use night mode in the evening."
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
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">Module 3 • Section 4</p>
            <h1 className="text-base font-bold text-white">Online Safety & Communication</h1>
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
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Online Safety & Communication</h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Protect yourself and your customers online — from professional email communication and GDPR compliance to spotting phishing scams, securing passwords, and maintaining digital wellbeing.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* Section 01 — Email Etiquette for Professionals */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Email Etiquette for Professionals</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Email is the backbone of professional communication. As an electrician, you will use email to send quotations, confirm appointments, deliver certificates, communicate with contractors and suppliers, and correspond with building control. The quality of your emails directly affects how clients and colleagues perceive your professionalism.
            </p>
            <p>
              <strong className="text-white">Professional Email Address</strong> — If you are self-employed or running a business, use a professional email address that includes your business name: info@smithelectrical.co.uk is far more professional than sparky_dave_1995@gmail.com. Many domain registrars offer email hosting for a few pounds per month, or you can use Google Workspace or Microsoft 365 to create professional addresses linked to your domain.
            </p>
            <p>
              <strong className="text-white">Subject Lines</strong> — Every email must have a clear, descriptive subject line. This helps the recipient prioritise your email and find it later. Good examples:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>"EICR Report — 14 Oak Street, Birmingham — 15 June 2025"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>"Quotation: Full Rewire — Henderson Residence"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>"Appointment Confirmation — Consumer Unit Upgrade — Tuesday 20 June"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>"Material Order Query — PO-2025-0042"</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Email Structure:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Greeting</strong> — "Dear Mr/Mrs [Name]" for formal correspondence, "Hi [Name]" for established business relationships. Avoid "Hey" or no greeting at all.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Opening</strong> — State the purpose of your email in the first sentence. "Please find attached the EICR for 14 Oak Street, completed on 15 June 2025."</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Body</strong> — Provide necessary details in short paragraphs. Use bullet points for lists. Be concise — busy clients appreciate brevity.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Call to Action</strong> — Clearly state what you need from the recipient: "Please review and confirm you are happy to proceed," or "Please sign and return at your earliest convenience."</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Sign-off</strong> — "Kind regards," or "Best regards," followed by your full signature block.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Email Signature Block</strong> — Every professional email should include a consistent signature containing: your full name, job title, company name, phone number, email address, website (if applicable), and registration numbers (NICEIC/ELECSA/NAPIT number). This provides recipients with all the information they need to verify your credentials and contact you.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Always proofread your emails before sending. Spelling and grammar errors in professional correspondence undermine client confidence. If the email is important, draft it, wait 10 minutes, then re-read it before clicking send. Check that all attachments are actually attached — "Please see attached" with no attachment is embarrassingly common.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 02 — Phishing & Scam Awareness */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Phishing & Scam Awareness</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Phishing attacks are one of the biggest cyber threats facing small businesses, including electrical contractors. Phishing is the practice of sending fraudulent emails, text messages, or creating fake websites that impersonate legitimate organisations to steal personal information, login credentials, or financial details.
            </p>
            <p>
              <strong className="text-white">Common Phishing Tactics Targeting Tradespeople:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Fake wholesaler emails</strong> — "Your account has been suspended. Click here to verify your details." These emails mimic the branding of major suppliers like Edmundson, CEF, or Rexel.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Fake HMRC emails</strong> — "You are entitled to a tax refund of £1,247.50. Click here to claim." HMRC will never email you with a link to claim a refund.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Invoice fraud</strong> — You receive an email appearing to be from a regular supplier with "updated" bank details, requesting you pay the next invoice to a different account. Always verify bank detail changes by phone using a known number.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Fake job enquiries</strong> — "We need urgent electrical work at [address]. Please click this link to view the specification." The link downloads malware.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">How to Spot a Phishing Email:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Check the sender's email address</strong> — Hover over the "From" name to see the actual email address. Phishing emails often use addresses that are close to but not exactly the legitimate domain (e.g. support@micr0soft.com instead of support@microsoft.com).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Urgency and threats</strong> — "Your account will be closed in 24 hours unless you verify." Legitimate companies do not threaten account closure via email with tight deadlines.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Spelling and grammar errors</strong> — Professional organisations proofread their communications. Multiple errors are a strong indicator of phishing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Suspicious links</strong> — Hover over (do not click) any links. The URL shown in the browser bar should match the legitimate website. If it shows a completely different domain, it is phishing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Requests for sensitive information</strong> — Legitimate organisations will never ask for passwords, full bank details, or National Insurance numbers via email.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">What to Do If You Suspect Phishing:</strong> Do not click any links or download any attachments. Do not reply to the email. Report it to the National Cyber Security Centre by forwarding it to report@phishing.gov.uk. If you have already clicked a link or entered information, change your passwords immediately and contact your bank if financial details were shared.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                When in doubt, do not click. Contact the supposed sender directly using a phone number or website you already know (not one from the suspicious email). Electricians are increasingly targeted because they are busy, often checking emails quickly on site, and may not scrutinise each message carefully. Take an extra 10 seconds to verify before acting.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 02 */}
        <InlineCheck
          question="You receive a text message saying: 'HMRC: You are due a tax refund of £1,847.20. Claim now at: hmrc-refunds-uk.co.com'. What should you do?"
          options={[
            "Click the link and enter your bank details to receive the refund",
            "Forward the text to a friend to check if they received the same message",
            "Ignore and delete the message — HMRC does not send refund notifications via text with links. Report it by forwarding to 7726",
            "Reply asking for more details"
          ]}
          correctIndex={2}
          explanation="This is a smishing (SMS phishing) attack. HMRC never sends text messages with links for tax refunds. The domain 'hmrc-refunds-uk.co.com' is not a genuine HMRC domain. Delete the message and report it by forwarding to 7726 (the UK's scam text reporting number). Never click links in unsolicited messages claiming to offer refunds or requiring urgent action."
        />

        {/* Section 03 — Password Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Password Security</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Weak passwords are the single biggest vulnerability in most people's digital security. As an electrician, your online accounts contain sensitive information: customer data, financial records, certification details, and business documents. Compromised passwords can lead to identity theft, financial loss, and breach of your GDPR obligations.
            </p>
            <p>
              <strong className="text-white">What Makes a Strong Password:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Length</strong> — At least 12 characters. Each additional character exponentially increases the time required to crack the password. A 12-character password is roughly 62 trillion times harder to crack than a 6-character password.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Complexity</strong> — Include uppercase letters, lowercase letters, numbers, and symbols. However, length matters more than complexity — "correcthorsebatterystaple" is stronger than "P@55w0rd!".</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Uniqueness</strong> — Never reuse passwords across different accounts. If one account is breached and you use the same password elsewhere, all your accounts are compromised. This is the most important rule.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Unpredictability</strong> — Avoid dictionary words, names, dates of birth, pet names, football teams, or any information that could be guessed from your social media profiles. Criminals specifically target this information.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Password Managers</strong> — The solution to creating and remembering unique, strong passwords for every account is a password manager. Popular options include:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Bitwarden (Free)</strong> — Open-source, cross-platform, and highly regarded by security professionals. The free tier is genuinely comprehensive.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">1Password</strong> — Excellent user interface, family and business plans available. Includes a feature called "Watchtower" that alerts you if any of your saved passwords appear in known data breaches.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Apple Keychain / Google Password Manager</strong> — Built into Apple and Google ecosystems respectively. Convenient if you use one ecosystem exclusively, but less flexible than dedicated managers.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Two-Factor Authentication (2FA)</strong> — Enable 2FA on every account that supports it. 2FA requires a second verification step after your password — typically a code from an authenticator app (Google Authenticator, Microsoft Authenticator) or a text message. Even if someone steals your password, they cannot access your account without the second factor. Prioritise enabling 2FA on your email, banking, cloud storage, and certification software accounts.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Install a password manager today and start migrating your accounts to unique, generated passwords. It takes about 30 minutes to set up and saves you from the catastrophic consequences of a password breach. Combined with two-factor authentication, this is the single most impactful security measure you can take.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 04 — GDPR for Electricians */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">GDPR for Electricians</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The General Data Protection Regulation (GDPR), retained in UK law as the UK GDPR alongside the Data Protection Act 2018, applies to every business that handles personal data — including sole-trader electricians. Personal data includes names, addresses, phone numbers, email addresses, and photographs that identify individuals. Non-compliance can result in significant fines and reputational damage.
            </p>
            <p>
              <strong className="text-white">Personal Data You Handle as an Electrician:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Customer names, addresses, phone numbers, and email addresses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Property details and access information (key codes, alarm codes)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Site photographs that may include people or identifiable locations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Payment details (if processing card payments)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Information on electrical certificates (occupier details, property information)</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Key GDPR Principles for Electricians:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Lawful basis</strong> — You need a legitimate reason to hold personal data. For electricians, "legitimate interest" (fulfilling a contract) and "legal obligation" (retaining certificates) are the most common bases.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Data minimisation</strong> — Only collect data you genuinely need. You need the property address and a contact number; you do not need the customer's date of birth or National Insurance number.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Storage limitation</strong> — Do not keep data longer than necessary. Delete customer contact details when they are no longer needed (though retain certificate data for the required retention period).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Security</strong> — Protect personal data with appropriate security measures: password-protected devices, encrypted storage, secure email.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Transparency</strong> — Customers have the right to know what data you hold about them and why. A simple privacy notice on your website or included with your quotation satisfies this requirement.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Practical GDPR Steps:</strong> Lock your phone and tablet with a PIN or biometric security. Encrypt your laptop's hard drive (BitLocker on Windows, FileVault on macOS). Do not leave customer paperwork visible in your van. If you lose a device containing customer data, report it to the Information Commissioner's Office (ICO) within 72 hours if there is a risk to individuals' rights. Register with the ICO (£40 per year for most small businesses) — this is a legal requirement.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                GDPR compliance is not complicated for electricians — it mainly means being sensible with customer information. Lock your devices, do not share customer details unnecessarily, keep data only as long as needed, and register with the ICO. These simple steps protect both your customers and your business.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 04 */}
        <InlineCheck
          question="A letting agent asks you to email them a list of all your residential customers' names and addresses so they can offer property services. What is the correct response?"
          options={[
            "Send the list — it helps the agent and your customers might appreciate the service",
            "Refuse — sharing customer personal data with a third party for marketing without customer consent violates GDPR",
            "Send just the addresses without names — that is not personal data",
            "Ask the agent to pay for the list first"
          ]}
          correctIndex={1}
          explanation="Sharing customers' personal data (names and addresses) with a third party for marketing purposes without the customers' explicit consent is a clear GDPR violation. Even addresses alone could constitute personal data if they identify an individual. You must politely refuse and explain that data protection regulations prevent you from sharing customer information."
        />

        {/* Section 05 — Social Media Best Practice */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Social Media Best Practice</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Social media is a powerful marketing tool for electricians. Platforms like Facebook, Instagram, and LinkedIn can generate enquiries, build your reputation, and showcase your work. However, social media also carries risks if used carelessly. Understanding best practice protects your professional reputation and your business.
            </p>
            <p>
              <strong className="text-white">Platforms for Electricians:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Facebook</strong> — Create a business page separate from your personal profile. Share before/after photos of installations, customer testimonials (with permission), and practical electrical tips. Facebook is particularly effective for domestic work and local community engagement.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Instagram</strong> — A visual platform perfect for showcasing high-quality photographs of your best work. Consumer unit upgrades, neatly dressed cables, and finished installations photograph well and demonstrate your standards to potential clients.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">LinkedIn</strong> — The professional network. Best for commercial work, connecting with architects, building managers, and main contractors. Share industry insights, CPD achievements, and professional milestones.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Content Guidelines:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Never post customer addresses</strong> — Even an innocent "Just completed a rewire at 42 Maple Drive" tells potential burglars the property was recently empty. Use general areas instead: "Rewire completed in Solihull this week."</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Get permission for photos</strong> — Before posting photographs of work at a customer's property, ask their permission. Some customers are private and do not want their home shown on social media.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Never criticise other electricians' work publicly</strong> — While it might be tempting to post photos of poor work you have found, publicly shaming other tradespeople reflects badly on you. Document the issues professionally in your EICR and move on.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Separate personal and professional</strong> — Keep your business social media professional. Political opinions, controversial views, and personal complaints should stay off your business pages.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Handling Negative Reviews</strong> — Negative reviews are inevitable. Respond promptly (within 24 hours), acknowledge the concern, apologise for their experience, and offer to resolve the issue privately. Never argue publicly, use sarcasm, or become defensive. Potential customers judge you more on your response to complaints than on the complaints themselves.
            </p>
          </div>
        </motion.div>

        {/* Section 06 — Video Conferencing */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Video Conferencing</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Video conferencing has become a standard business communication tool. While electricians spend most of their time on site, there are many situations where video calls are useful: pre-contract meetings with clients, progress reviews with project managers, training sessions, manufacturer product demonstrations, and interviews.
            </p>
            <p>
              <strong className="text-white">Popular Platforms:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Microsoft Teams</strong> — The most widely used platform in commercial construction. If you work with main contractors or larger organisations, Teams is likely their standard communication platform. It integrates with Microsoft 365 for file sharing and collaboration.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Zoom</strong> — Known for its simplicity and reliability. The free tier allows meetings up to 40 minutes. Widely used for training sessions and webinars.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Google Meet</strong> — Integrated with Google Workspace. Accessible directly from a web browser without installing software, making it convenient for quick calls.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">FaceTime / WhatsApp Video</strong> — Useful for informal video calls with clients. For example, a client can show you the existing installation via video call to help you prepare a quotation without a site visit.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Video Call Etiquette:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Test your camera, microphone, and internet connection before the meeting starts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Choose a quiet location with a tidy background — or use a virtual background</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Look at the camera (not the screen) when speaking — this creates the impression of eye contact</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Mute your microphone when not speaking to avoid background noise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Dress appropriately — even if you are at home, business-casual dress maintains professionalism</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Screen Sharing for Electricians</strong> — Screen sharing is invaluable for reviewing drawings, showing cable calculation spreadsheets, or walking clients through quotations. Before sharing your screen, close any personal tabs, notifications, or irrelevant applications. Share only the specific window (not your entire screen) to maintain privacy and focus.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Video calls can replace many face-to-face meetings, saving travel time and costs. A 15-minute video call to discuss a quotation with a potential client is far more efficient than a 30-minute drive each way. Embrace video conferencing as a productivity tool, not an inconvenience.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 06 */}
        <InlineCheck
          question="You need to discuss a project with a main contractor who uses Microsoft Teams. You have never used Teams before. What is the best approach?"
          options={[
            "Refuse and insist on a phone call instead",
            "Download Teams, set up your account, and test your audio/video before the scheduled meeting",
            "Tell them you cannot attend",
            "Ask them to use a platform you are already familiar with"
          ]}
          correctIndex={1}
          explanation="The professional approach is to download and familiarise yourself with the platform before the meeting. Microsoft Teams is free to use and available on Windows, macOS, iOS, and Android. Setting up and testing beforehand shows initiative and professionalism. Most commercial construction companies use Teams, so investing a few minutes in learning it will benefit many future interactions."
        />

        {/* Section 07 — Online Training Platforms */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Online Training Platforms</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Online learning has opened up unprecedented access to training and CPD opportunities for electricians. Whether you are preparing for your AM2 assessment, studying for the 18th Edition exam, learning about EV charging installation, or developing business skills, there are online platforms to support your learning — many of which are free or very affordable.
            </p>
            <p>
              <strong className="text-white">Industry-Specific Platforms:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">IET Academy</strong> — Online courses directly from the Institution of Engineering and Technology, the publishers of BS 7671. Courses cover regulation updates, specific chapters of the Wiring Regulations, and emerging technologies. CPD points are awarded for completion.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">NICEIC/ELECSA Online Training</strong> — Certsure offers online training modules for registered contractors. Topics include regulation changes, certification best practice, and technical guidance. Completion contributes to your CPD record.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Manufacturer E-Learning</strong> — Many manufacturers provide free online training for their products. Hager, Schneider Electric, Eaton, and others offer accredited courses on topics from consumer unit installation to smart home systems. These are excellent for staying current with new products and often come with CPD certificates.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">General Learning Platforms:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Udemy</strong> — Affordable courses on a wide range of topics including electrical theory, spreadsheet skills, business management, and first aid. Courses are often discounted to under £15.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">YouTube</strong> — An enormous library of free educational content. Search for specific topics like "18th Edition exam preparation" or "cable sizing calculations explained." Verify the credibility of the creator by checking their qualifications and credentials.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">LinkedIn Learning</strong> — Professional courses on business skills, project management, and software tools. Included with LinkedIn Premium subscriptions. Particularly useful for developing the business and management skills needed as your career progresses.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Making Online Learning Effective:</strong> Set a regular study schedule — even 30 minutes three times a week produces significant results over time. Take notes as you would in a classroom. Complete all practice exercises and assessments. Apply what you learn on real jobs as soon as possible — practical application reinforces theoretical learning.
            </p>
          </div>
        </motion.div>

        {/* Section 08 — Digital Wellbeing */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Digital Wellbeing</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              As digital tools become an ever larger part of electrical work — from certification apps and email to social media and online learning — it is important to manage your relationship with technology to protect your physical and mental health. Digital wellbeing means using technology purposefully and mindfully, not letting it control your time and attention.
            </p>
            <p>
              <strong className="text-white">Screen Fatigue and Eye Strain</strong> — Prolonged screen use causes digital eye strain, characterised by tired eyes, headaches, blurred vision, and dry eyes. This is exacerbated for electricians who alternate between screen work and the varied lighting conditions found on site.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">The 20-20-20 Rule</strong> — Every 20 minutes of screen use, look at something 20 feet (6 metres) away for at least 20 seconds. This relaxes the focusing muscles in your eyes and reduces strain.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Adjust Brightness</strong> — Match your screen brightness to your environment. A very bright screen in a dim room (or a dim screen in bright sunlight) forces your eyes to work harder. Most devices have an auto-brightness feature.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Night Mode</strong> — Enable night mode (blue light filter) in the evening. Blue light from screens can disrupt your sleep cycle. Both Windows and macOS have built-in night mode settings, as do iOS and Android.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Managing Notifications</strong> — Constant notifications fragment your attention and increase stress. Configure your devices to minimise unnecessary interruptions:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Turn off notifications for non-essential apps (social media, news, games)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Keep notifications enabled for genuinely important communications (calls, messages from clients, calendar reminders)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Use "Do Not Disturb" mode during focused work — whether that is installing on site or completing certificates at home</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Schedule specific times to check email and social media rather than responding to every notification as it arrives</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Work-Life Boundaries</strong> — The convenience of digital tools can blur the boundary between work and personal time. When your certification software, work emails, and client messages are all on your personal phone, it becomes difficult to switch off. Consider these strategies:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Set a specific time after which you do not check work emails or messages (e.g. after 7pm)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Use separate devices or separate user profiles for work and personal use if possible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Set an out-of-office auto-reply for evenings and weekends so clients know when to expect a response</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Take regular breaks from all screens — especially on weekends and holidays</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Mental Health and Social Media</strong> — Social media can be a valuable professional tool, but excessive use or constant comparison with others can negatively affect mental health. If you find yourself anxiously comparing your business to competitors, feeling stressed by online negativity, or spending more time scrolling than working, it is time to set boundaries. The construction and trades industry has made significant progress in recognising mental health — organisations like the Lighthouse Construction Industry Charity and Mates in Mind provide support specifically for construction workers.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Technology should serve you — not the other way around. Use digital tools purposefully during working hours, then switch off and recharge. An electrician who is well-rested, focused, and mentally healthy does better work, makes fewer mistakes, and builds a more sustainable career than one who is constantly connected but perpetually exhausted.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Online Safety & Communication Quiz" />

        {/* Nav footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module3/section3"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Documentation & Apps
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module4"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Continue to Module 4
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule3Section4;
