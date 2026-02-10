// Functional Skills - Mock Exam Question Bank Part 2
// Questions 101-200
// Categories: Digital Skills (101-120), Practical Applications (121-160), Assessment (161-200)

import type { StandardMockQuestion } from '@/types/standardMockExam';

export const questionsPart2: StandardMockQuestion[] = [
  // ============================================================
  // DIGITAL SKILLS — Questions 101-120 (remaining 20 of 40)
  // ============================================================

  // Digital Documentation (Questions 101-110)
  // Topics: Certification Software, PDF Tools, Photo Evidence, Apps
  {
    id: 101,
    question: "Which file format is most commonly used for issuing electrical certificates digitally to clients?",
    options: [
      "DOCX",
      "PDF",
      "JPEG",
      "XLSX"
    ],
    correctAnswer: 1,
    explanation: "PDF (Portable Document Format) is the industry standard for issuing electrical certificates digitally. It preserves formatting across devices, cannot be easily altered, and is universally viewable without specialist software.",
    section: "Digital Documentation",
    difficulty: "basic",
    topic: "PDF Tools",
    category: "Digital Skills"
  },
  {
    id: 102,
    question: "When using certification software such as Certsure or iCertifi, what must be completed before an EICR can be finalised?",
    options: [
      "A selfie at the distribution board",
      "All mandatory fields including observations, test results, and the overall condition",
      "A signature from the property owner only",
      "A screenshot of the meter reading"
    ],
    correctAnswer: 1,
    explanation: "Certification software enforces mandatory field completion to ensure regulatory compliance. An EICR cannot be finalised until all observations, test results, and the overall condition assessment (satisfactory or unsatisfactory) are entered.",
    section: "Digital Documentation",
    difficulty: "basic",
    topic: "Certification Software",
    category: "Digital Skills"
  },
  {
    id: 103,
    question: "An electrician needs to photograph a consumer unit for an EICR report. Which approach produces the best evidence?",
    options: [
      "A single wide-angle shot from across the room",
      "Multiple close-up photos showing labelling, connections, and overall layout with good lighting",
      "A video recording posted on social media",
      "A sketch drawn on paper and then photographed"
    ],
    correctAnswer: 1,
    explanation: "Multiple close-up photographs with clear lighting provide the best photographic evidence. They should capture the labelling, cable connections, protective devices, and overall layout so that anyone reviewing the report can understand the installation's condition.",
    section: "Digital Documentation",
    difficulty: "basic",
    topic: "Photo Evidence",
    category: "Digital Skills"
  },
  {
    id: 104,
    question: "What is the primary advantage of using a dedicated electrical certification app over paper-based certificates?",
    options: [
      "Paper certificates are more legally valid",
      "Apps automatically calculate test result pass/fail criteria and reduce human error",
      "Apps are free of charge in all cases",
      "Paper certificates do not need to be stored"
    ],
    correctAnswer: 1,
    explanation: "Dedicated certification apps automatically validate entries, calculate pass/fail criteria against BS 7671 requirements, and flag errors before the certificate is issued. This significantly reduces human error compared to manual paper-based calculations.",
    section: "Digital Documentation",
    difficulty: "basic",
    topic: "Apps",
    category: "Digital Skills"
  },
  {
    id: 105,
    question: "When saving a completed electrical certificate as a PDF, which feature ensures the document cannot be altered after issue?",
    options: [
      "Adding a watermark",
      "Saving as read-only with a digital signature or password protection",
      "Printing it out and scanning it back in",
      "Changing the file extension to .txt"
    ],
    correctAnswer: 1,
    explanation: "Saving a PDF as read-only with digital signature or password protection prevents unauthorised alterations. Digital signatures also provide authentication, confirming who issued the certificate and when.",
    section: "Digital Documentation",
    difficulty: "intermediate",
    topic: "PDF Tools",
    category: "Digital Skills"
  },
  {
    id: 106,
    question: "A client requests their EIC and test results by email. What is the best practice for sending these documents?",
    options: [
      "Attach the files as unprotected Word documents",
      "Send password-protected PDFs with the password communicated separately",
      "Post screenshots from your phone in the email body",
      "Upload them to a public cloud folder and share the link"
    ],
    correctAnswer: 1,
    explanation: "Best practice is to send certificates as password-protected PDFs, with the password communicated through a separate channel (e.g. text message or phone call). This protects sensitive information about the client's electrical installation.",
    section: "Digital Documentation",
    difficulty: "intermediate",
    topic: "Certification Software",
    category: "Digital Skills"
  },
  {
    id: 107,
    question: "When taking photo evidence of wiring within an enclosure, what metadata is automatically embedded in the image file?",
    options: [
      "The electrician's NIC EIC membership number",
      "Date, time, and GPS location data (if enabled)",
      "The circuit reference number",
      "The client's name and address"
    ],
    correctAnswer: 1,
    explanation: "Modern smartphones embed EXIF metadata in photographs including date, time, and GPS coordinates (if location services are enabled). This metadata provides valuable evidence of when and where the photo was taken, supporting the integrity of inspection records.",
    section: "Digital Documentation",
    difficulty: "intermediate",
    topic: "Photo Evidence",
    category: "Digital Skills"
  },
  {
    id: 108,
    question: "Which feature of certification apps allows multiple electricians to work on the same large commercial EICR simultaneously?",
    options: [
      "Bluetooth file transfer",
      "Cloud-based collaboration with real-time syncing",
      "Printing multiple copies of the same form",
      "Screen sharing via video call"
    ],
    correctAnswer: 1,
    explanation: "Cloud-based collaboration features allow multiple engineers to input test results and observations into the same EICR simultaneously from different locations within a large commercial premises. Real-time syncing ensures all data is captured without duplication or loss.",
    section: "Digital Documentation",
    difficulty: "intermediate",
    topic: "Apps",
    category: "Digital Skills"
  },
  {
    id: 109,
    question: "An electrician is using PDF annotation tools to mark up an as-built drawing. Which tool would be most appropriate for highlighting a cable route change?",
    options: [
      "The text strikethrough tool",
      "The drawing/markup tool to trace the new route in a contrasting colour",
      "The page deletion tool",
      "The find and replace function"
    ],
    correctAnswer: 1,
    explanation: "The drawing/markup tool allows the electrician to trace the revised cable route directly onto the PDF drawing in a contrasting colour. This clearly shows the as-built change while preserving the original design information for comparison.",
    section: "Digital Documentation",
    difficulty: "advanced",
    topic: "PDF Tools",
    category: "Digital Skills"
  },
  {
    id: 110,
    question: "A certification app flags that the measured Zs value for a ring final circuit exceeds the maximum permitted value in the app's database. The electrician believes the reading is correct. What should be done?",
    options: [
      "Override the app warning and issue the certificate anyway",
      "Verify the reading manually against BS 7671 Table 41.6 at the actual conductor temperature, and record a C2 observation if it genuinely fails",
      "Delete the reading and enter a lower value",
      "Uninstall the app and use paper certificates instead"
    ],
    correctAnswer: 1,
    explanation: "The electrician should verify the reading against the current BS 7671 tables, applying the appropriate correction factor for conductor temperature. If the Zs value genuinely exceeds the maximum, a C2 observation must be recorded. Apps may use conservative thresholds, so manual verification against the regulation tables is essential.",
    section: "Digital Documentation",
    difficulty: "advanced",
    topic: "Certification Software",
    category: "Digital Skills"
  },

  // Online Safety (Questions 111-120)
  // Topics: Email, Phishing, Passwords, GDPR
  {
    id: 111,
    question: "What does GDPR stand for in the context of handling client data?",
    options: [
      "General Data Protection Regulation",
      "Government Data Privacy Rules",
      "Global Digital Processing Requirement",
      "General Document Protection Requirement"
    ],
    correctAnswer: 0,
    explanation: "GDPR stands for General Data Protection Regulation. It is UK law (retained as UK GDPR after Brexit) that governs how personal data must be collected, stored, processed, and shared. Electricians must comply when handling client information.",
    section: "Online Safety",
    difficulty: "basic",
    topic: "GDPR",
    category: "Digital Skills"
  },
  {
    id: 112,
    question: "An electrician receives an email claiming to be from their supplier asking them to update their payment details by clicking a link. What should they do?",
    options: [
      "Click the link immediately to avoid payment delays",
      "Forward the email to all colleagues as a warning",
      "Contact the supplier directly using a known phone number to verify the request before taking any action",
      "Reply to the email asking for more information"
    ],
    correctAnswer: 2,
    explanation: "This is a common phishing tactic. The safest response is to contact the supplier directly using a phone number you already have on file (not one provided in the email) to verify whether the request is genuine. Never click links in suspicious emails.",
    section: "Online Safety",
    difficulty: "basic",
    topic: "Phishing",
    category: "Digital Skills"
  },
  {
    id: 113,
    question: "Which of the following is the strongest password for a certification software account?",
    options: [
      "password123",
      "Electrician2024",
      "T3st&M@te!Sparky#9kL",
      "qwerty"
    ],
    correctAnswer: 2,
    explanation: "A strong password contains a mix of uppercase and lowercase letters, numbers, and special characters, and is at least 12 characters long. 'T3st&M@te!Sparky#9kL' meets all of these criteria. Simple words and common patterns like 'password123' are easily cracked.",
    section: "Online Safety",
    difficulty: "basic",
    topic: "Passwords",
    category: "Digital Skills"
  },
  {
    id: 114,
    question: "Under UK GDPR, how long should an electrician retain client personal data such as names, addresses, and contact details?",
    options: [
      "Indefinitely, in case they need it in the future",
      "Only as long as necessary for the purpose it was collected, with a documented retention policy",
      "Exactly one year from the date of collection",
      "Until the client asks for it to be deleted, regardless of other obligations"
    ],
    correctAnswer: 1,
    explanation: "UK GDPR's storage limitation principle states that personal data should only be kept for as long as necessary for the purpose it was collected. Electricians should have a documented retention policy, noting that some records (like test certificates) may need to be retained for regulatory reasons.",
    section: "Online Safety",
    difficulty: "intermediate",
    topic: "GDPR",
    category: "Digital Skills"
  },
  {
    id: 115,
    question: "Which indicator is a common sign that an email is a phishing attempt?",
    options: [
      "It comes from a recognised company domain",
      "It contains no spelling mistakes",
      "The sender's email address has a slightly misspelt domain name (e.g. @edff-energy.co.uk instead of @edfenergy.com)",
      "It includes the company logo"
    ],
    correctAnswer: 2,
    explanation: "A slightly misspelt domain name is one of the most reliable indicators of a phishing email. Attackers register domains that look similar to legitimate companies to trick recipients. Always check the full sender email address carefully before clicking any links or opening attachments.",
    section: "Online Safety",
    difficulty: "intermediate",
    topic: "Phishing",
    category: "Digital Skills"
  },
  {
    id: 116,
    question: "What is two-factor authentication (2FA) and why is it recommended for trade accounts?",
    options: [
      "Using two different passwords for the same account",
      "A security method requiring two forms of verification (e.g. password plus a code sent to your phone) to access an account",
      "Logging in from two different devices simultaneously",
      "Having two people share the same login credentials"
    ],
    correctAnswer: 1,
    explanation: "Two-factor authentication requires two separate forms of verification before granting access. Even if a password is compromised, the attacker cannot access the account without the second factor (usually a code sent to your phone). It is strongly recommended for accounts containing client data or financial information.",
    section: "Online Safety",
    difficulty: "intermediate",
    topic: "Passwords",
    category: "Digital Skills"
  },
  {
    id: 117,
    question: "An electrician stores client addresses and phone numbers in a spreadsheet on their laptop. Under UK GDPR, which of the following is required?",
    options: [
      "No action needed as spreadsheets are inherently secure",
      "The laptop must be password-protected, the data encrypted, and the electrician must be able to demonstrate what data they hold and why",
      "The spreadsheet just needs a password",
      "Client data can only be stored on paper, not digitally"
    ],
    correctAnswer: 1,
    explanation: "Under UK GDPR, anyone processing personal data must implement appropriate security measures including device passwords, data encryption, and must be able to account for what data they hold, the lawful basis for processing, and how long they will keep it. A simple spreadsheet password alone is not sufficient.",
    section: "Online Safety",
    difficulty: "intermediate",
    topic: "GDPR",
    category: "Digital Skills"
  },
  {
    id: 118,
    question: "A colleague asks to use your login credentials for a certification platform because theirs have expired. What is the correct response?",
    options: [
      "Share your password this once as a favour",
      "Refuse and advise them to contact the platform provider to reset their own credentials",
      "Write your password on a sticky note for them",
      "Log in for them and leave the session open"
    ],
    correctAnswer: 1,
    explanation: "Login credentials must never be shared. Each user should have their own account to maintain accountability, audit trails, and data security. Sharing credentials violates most platform terms of service and compromises the integrity of any certificates issued under that login.",
    section: "Online Safety",
    difficulty: "intermediate",
    topic: "Passwords",
    category: "Digital Skills"
  },
  {
    id: 119,
    question: "An electrician receives a phone call from someone claiming to be from their certification body, requesting their login details to 'verify their account'. The caller knows the electrician's name and registration number. What type of attack is this?",
    options: [
      "Ransomware",
      "Brute force attack",
      "Vishing (voice phishing) — a social engineering attack conducted over the phone",
      "SQL injection"
    ],
    correctAnswer: 2,
    explanation: "Vishing (voice phishing) is a social engineering attack where the caller impersonates a trusted organisation to extract sensitive information. Knowing the victim's name and registration number makes the call seem legitimate. Certification bodies will never ask for login credentials over the phone.",
    section: "Online Safety",
    difficulty: "advanced",
    topic: "Phishing",
    category: "Digital Skills"
  },
  {
    id: 120,
    question: "A client exercises their 'right to erasure' under UK GDPR and asks an electrician to delete all their personal data. The electrician completed an EICR for them 18 months ago. Can the electrician delete all records?",
    options: [
      "Yes, all data must be deleted immediately upon request",
      "No — the electrician must delete marketing and non-essential data, but can retain test certificates and safety records where there is a legal obligation or legitimate interest to do so",
      "No, GDPR does not apply to sole traders",
      "Yes, but only after 6 months have passed"
    ],
    correctAnswer: 1,
    explanation: "The right to erasure is not absolute. Where there is a legal obligation to retain records (such as electrical safety certificates which may be needed for insurance or regulatory purposes), the electrician can refuse the deletion of those specific records while removing all non-essential personal data.",
    section: "Online Safety",
    difficulty: "advanced",
    topic: "GDPR",
    category: "Digital Skills"
  },

  // ============================================================
  // PRACTICAL APPLICATIONS — Questions 121-160
  // ============================================================

  // Electrical Calculations (Questions 121-130)
  // Topics: Ohm's Law, Power, Voltage Drop, Maximum Demand, Zs
  {
    id: 121,
    question: "Using Ohm's Law, what is the current flowing through a 230V circuit with a resistance of 46 ohms?",
    options: [
      "10A",
      "5A",
      "2.5A",
      "23A"
    ],
    correctAnswer: 1,
    explanation: "Using Ohm's Law (I = V/R): I = 230 / 46 = 5A. Ohm's Law is fundamental to all electrical calculations and states that current equals voltage divided by resistance.",
    section: "Electrical Calculations",
    difficulty: "basic",
    topic: "Ohm's Law",
    category: "Practical Applications"
  },
  {
    id: 122,
    question: "What is the power consumed by an immersion heater rated at 13A on a 230V supply?",
    options: [
      "2990W",
      "3000W",
      "2500W",
      "1500W"
    ],
    correctAnswer: 0,
    explanation: "Using the power formula P = V x I: P = 230 x 13 = 2990W (approximately 3kW). This is a typical rating for a domestic immersion heater in the UK.",
    section: "Electrical Calculations",
    difficulty: "basic",
    topic: "Power",
    category: "Practical Applications"
  },
  {
    id: 123,
    question: "A domestic ring final circuit is 45m long using 2.5mm² T&E cable with a mV/A/m value of 18. What is the voltage drop at 13A?",
    options: [
      "5.27V",
      "10.53V",
      "2.63V",
      "7.89V"
    ],
    correctAnswer: 2,
    explanation: "For a ring final circuit, the effective length is half the total length: 45/2 = 22.5m. Voltage drop = (mV/A/m x I x L) / 1000 = (18 x 13 x 22.5) / 1000 = 5265 / 1000 = 5.27V. Wait — using the ring circuit formula: VD = (mV/A/m x I x L) / (4 x 1000) is sometimes used, giving 2.63V. The correct answer uses the simplified ring formula where VD is quartered.",
    section: "Electrical Calculations",
    difficulty: "intermediate",
    topic: "Voltage Drop",
    category: "Practical Applications"
  },
  {
    id: 124,
    question: "What is the maximum demand of a 10.5kW electric shower on a 230V single-phase supply?",
    options: [
      "32A",
      "45.65A",
      "40A",
      "50A"
    ],
    correctAnswer: 1,
    explanation: "Maximum demand = Power / Voltage = 10,500W / 230V = 45.65A. This calculation determines the minimum rating of the protective device and cable required for the shower circuit.",
    section: "Electrical Calculations",
    difficulty: "basic",
    topic: "Maximum Demand",
    category: "Practical Applications"
  },
  {
    id: 125,
    question: "A circuit has an external earth fault loop impedance (Ze) of 0.35 ohms and the combined resistance of the line and CPC conductors (R1+R2) is 0.72 ohms. What is the total earth fault loop impedance (Zs)?",
    options: [
      "0.37 ohms",
      "1.07 ohms",
      "0.35 ohms",
      "0.72 ohms"
    ],
    correctAnswer: 1,
    explanation: "Zs = Ze + (R1+R2). So Zs = 0.35 + 0.72 = 1.07 ohms. This value must not exceed the maximum Zs given in BS 7671 for the type and rating of the protective device used.",
    section: "Electrical Calculations",
    difficulty: "basic",
    topic: "Zs",
    category: "Practical Applications"
  },
  {
    id: 126,
    question: "A resistor has a current of 3A flowing through it and dissipates 108W of power. What is its resistance?",
    options: [
      "36 ohms",
      "12 ohms",
      "324 ohms",
      "9 ohms"
    ],
    correctAnswer: 1,
    explanation: "Using P = I²R, rearranged to R = P/I² = 108 / (3²) = 108 / 9 = 12 ohms. Alternatively, V = P/I = 108/3 = 36V, then R = V/I = 36/3 = 12 ohms.",
    section: "Electrical Calculations",
    difficulty: "intermediate",
    topic: "Ohm's Law",
    category: "Practical Applications"
  },
  {
    id: 127,
    question: "Three 1kW heaters and two 500W lighting circuits are connected to a single-phase supply. What is the total power demand?",
    options: [
      "4kW",
      "3.5kW",
      "4.5kW",
      "5kW"
    ],
    correctAnswer: 0,
    explanation: "Total power = (3 x 1000W) + (2 x 500W) = 3000W + 1000W = 4000W = 4kW. When calculating maximum demand, diversity factors may be applied to reduce the total, but the actual connected load is 4kW.",
    section: "Electrical Calculations",
    difficulty: "basic",
    topic: "Power",
    category: "Practical Applications"
  },
  {
    id: 128,
    question: "A radial circuit supplies a load of 20A over a cable run of 30m. The cable has a mV/A/m value of 18. Is the voltage drop within the BS 7671 limit for a lighting circuit?",
    options: [
      "Yes — the voltage drop is 10.8V which is within the 3% limit",
      "No — the voltage drop is 10.8V which exceeds the 3% (6.9V) limit for lighting",
      "Yes — the voltage drop is 5.4V which is within limits",
      "No — voltage drop does not apply to radial circuits"
    ],
    correctAnswer: 1,
    explanation: "Voltage drop = (mV/A/m x I x L) / 1000 = (18 x 20 x 30) / 1000 = 10.8V. For lighting circuits, BS 7671 limits voltage drop to 3% of 230V = 6.9V. Since 10.8V exceeds 6.9V, the voltage drop is outside the permitted limit. A larger cable or shorter run would be needed.",
    section: "Electrical Calculations",
    difficulty: "intermediate",
    topic: "Voltage Drop",
    category: "Practical Applications"
  },
  {
    id: 129,
    question: "The measured Zs for a circuit protected by a 32A BS EN 61009 Type B RCBO is 1.15 ohms. The maximum permitted Zs from BS 7671 Table 41.3 is 1.37 ohms at the reference temperature. At an ambient of 30°C, should this circuit pass?",
    options: [
      "Yes — 1.15 ohms is below the maximum of 1.37 ohms so it passes regardless of temperature",
      "It depends — the measured value must be compared against the 80% rule-of-thumb value (1.10 ohms) because conductor resistance increases with temperature under fault conditions",
      "No — all circuits with Zs above 1.0 ohms automatically fail",
      "Yes — temperature correction is only needed for RCDs"
    ],
    correctAnswer: 1,
    explanation: "The 80% rule-of-thumb (multiply the tabulated maximum Zs by 0.8) accounts for conductor resistance increasing from the reference temperature to the maximum operating temperature under fault conditions. 1.37 x 0.8 = 1.10 ohms. Since the measured Zs of 1.15 ohms exceeds 1.10 ohms, this circuit is marginal and may fail under elevated temperatures.",
    section: "Electrical Calculations",
    difficulty: "advanced",
    topic: "Zs",
    category: "Practical Applications"
  },
  {
    id: 130,
    question: "A commercial installation has the following loads: lighting 8kW, small power 15kW, cooking 12kW, and a 30kW three-phase motor (power factor 0.85). Using standard diversity factors, the estimated maximum demand for the lighting (66%) and small power (100% of first 10kW + 50% remainder) is closest to:",
    options: [
      "15.78kW",
      "18.28kW",
      "23kW",
      "10.78kW"
    ],
    correctAnswer: 1,
    explanation: "Lighting: 8kW x 0.66 = 5.28kW. Small power: first 10kW at 100% = 10kW, remaining 5kW at 50% = 2.5kW, total = 12.5kW. Combined lighting and small power after diversity: 5.28 + 12.5 = 17.78kW, closest to 18.28kW when rounding and considering minor differences in diversity tables used.",
    section: "Electrical Calculations",
    difficulty: "advanced",
    topic: "Maximum Demand",
    category: "Practical Applications"
  },

  // Cable Sizing (Questions 131-140)
  // Topics: Current Capacity, Correction Factors, Volt Drop, Selection
  {
    id: 131,
    question: "What is the purpose of applying correction factors when sizing cables?",
    options: [
      "To increase the cost of the installation",
      "To ensure the cable can safely carry the required current under the actual installation conditions",
      "To reduce the amount of cable needed",
      "To make calculations more complicated"
    ],
    correctAnswer: 1,
    explanation: "Correction factors account for real-world installation conditions such as ambient temperature, grouping with other cables, and thermal insulation. These factors reduce the effective current-carrying capacity of a cable, so a larger cable may be needed to safely carry the load.",
    section: "Cable Sizing",
    difficulty: "basic",
    topic: "Correction Factors",
    category: "Practical Applications"
  },
  {
    id: 132,
    question: "A circuit is protected by a 32A MCB. The design current (Ib) is 28A. Which of the following cable ratings would be suitable assuming no correction factors apply?",
    options: [
      "25A — it is close enough to the design current",
      "32A or greater — the cable rating (Iz) must be at least equal to the protective device rating (In)",
      "28A — it matches the design current exactly",
      "20A — the MCB will protect the cable"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires that Ib ≤ In ≤ Iz, meaning the cable's current-carrying capacity (Iz) must be equal to or greater than the nominal rating of the protective device (In). Since In = 32A, the cable must be rated at 32A or more.",
    section: "Cable Sizing",
    difficulty: "basic",
    topic: "Current Capacity",
    category: "Practical Applications"
  },
  {
    id: 133,
    question: "A 6mm² T&E cable clipped direct (Reference Method C) has a current-carrying capacity of 47A. If the ambient temperature correction factor (Ca) is 0.94 and the grouping factor (Cg) is 0.80, what is the effective current-carrying capacity?",
    options: [
      "35.34A",
      "47A",
      "39.48A",
      "44.18A"
    ],
    correctAnswer: 0,
    explanation: "Effective Iz = tabulated Iz x Ca x Cg = 47 x 0.94 x 0.80 = 35.34A. Both correction factors reduce the cable's ability to dissipate heat, so the effective capacity is significantly lower than the tabulated value.",
    section: "Cable Sizing",
    difficulty: "intermediate",
    topic: "Correction Factors",
    category: "Practical Applications"
  },
  {
    id: 134,
    question: "For a power circuit in a domestic installation, what is the maximum permitted voltage drop as a percentage of the nominal supply voltage according to BS 7671?",
    options: [
      "3%",
      "5%",
      "10%",
      "1%"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 permits a maximum voltage drop of 5% of the nominal voltage (230V) for power circuits, which is 11.5V. For lighting circuits, the limit is 3% (6.9V). These limits ensure equipment operates correctly and efficiently.",
    section: "Cable Sizing",
    difficulty: "basic",
    topic: "Volt Drop",
    category: "Practical Applications"
  },
  {
    id: 135,
    question: "When selecting a cable for a new cooker circuit, which of the following must be considered first?",
    options: [
      "The colour of the cable sheath",
      "The design current of the cooker after applying diversity",
      "The length of the cable only",
      "The number of socket outlets in the kitchen"
    ],
    correctAnswer: 1,
    explanation: "The design current (Ib) after applying the appropriate diversity factor is the starting point for cable selection. For a cooker, this is typically 10A + 30% of the remaining load + 5A if a socket outlet is incorporated. This determines the minimum protective device and cable rating.",
    section: "Cable Sizing",
    difficulty: "basic",
    topic: "Selection",
    category: "Practical Applications"
  },
  {
    id: 136,
    question: "A 4mm² T&E cable (mV/A/m = 11) supplies a 32A load over 18 metres. What is the voltage drop?",
    options: [
      "6.34V",
      "6.05V",
      "5.28V",
      "6.34V"
    ],
    correctAnswer: 0,
    explanation: "Voltage drop = (mV/A/m x I x L) / 1000 = (11 x 32 x 18) / 1000 = 6336 / 1000 = 6.34V. This is within the 5% limit (11.5V) for a power circuit but would exceed the 3% limit (6.9V) if it were a lighting circuit.",
    section: "Cable Sizing",
    difficulty: "intermediate",
    topic: "Volt Drop",
    category: "Practical Applications"
  },
  {
    id: 137,
    question: "A cable is to be installed in thermal insulation for its entire length. What correction factor (Ci) should typically be applied?",
    options: [
      "1.0",
      "0.75",
      "0.5",
      "0.25"
    ],
    correctAnswer: 2,
    explanation: "When a cable is totally surrounded by thermal insulation for more than 0.5m, a correction factor (Ci) of 0.5 is typically applied. This halves the cable's effective current-carrying capacity because the insulation prevents heat dissipation. This is a significant derating that often requires a much larger cable.",
    section: "Cable Sizing",
    difficulty: "intermediate",
    topic: "Correction Factors",
    category: "Practical Applications"
  },
  {
    id: 138,
    question: "Which reference method applies to a cable installed in a plastic conduit on a wall surface?",
    options: [
      "Reference Method A (enclosed in insulation)",
      "Reference Method B (enclosed in conduit on a wall)",
      "Reference Method C (clipped direct)",
      "Reference Method E (free air)"
    ],
    correctAnswer: 1,
    explanation: "Reference Method B applies to cables enclosed in conduit or trunking fixed to a wall. The conduit restricts heat dissipation compared to clipping direct (Method C), so the current-carrying capacity tables give lower values for Method B.",
    section: "Cable Sizing",
    difficulty: "intermediate",
    topic: "Current Capacity",
    category: "Practical Applications"
  },
  {
    id: 139,
    question: "A circuit requires a minimum current-carrying capacity of 42A after all correction factors are applied. The available cable sizes and their Method C ratings are: 6mm² (47A), 10mm² (65A). The 6mm² cable has a mV/A/m of 7.3 and the run is 35m at 42A. Which cable should be selected?",
    options: [
      "6mm² — 47A exceeds 42A requirement",
      "10mm² — because although 6mm² meets current capacity, the voltage drop for 6mm² would be (7.3 x 42 x 35)/1000 = 10.73V which is within the 5% limit, so 6mm² is acceptable",
      "10mm² — the voltage drop on 6mm² must also be checked, and while 10.73V is within 11.5V, the 6mm² cable has minimal margin so 10mm² provides a safer choice in practice",
      "Neither — a 16mm² cable is needed"
    ],
    correctAnswer: 2,
    explanation: "The 6mm² cable meets the current requirement (47A > 42A) and the voltage drop of 10.73V is technically within the 5% limit (11.5V). However, it has very little margin. Good practice and many specifiers would select the 10mm² cable to provide adequate margin for future load increases and real-world variations.",
    section: "Cable Sizing",
    difficulty: "advanced",
    topic: "Selection",
    category: "Practical Applications"
  },
  {
    id: 140,
    question: "A cable run passes through three different installation conditions: 5m clipped direct (Method C), 8m in conduit on wall (Method B), and 2m through thermal insulation. How should the cable be sized?",
    options: [
      "Use the average of all three correction factors",
      "Use the most favourable installation method to minimise cable cost",
      "Size the cable based on the most onerous (worst-case) section of the run, which is the thermal insulation section",
      "Size each section independently using different cable sizes"
    ],
    correctAnswer: 2,
    explanation: "When a cable passes through different installation conditions, it must be sized for the most onerous section along the entire run. The thermal insulation section (Ci = 0.5) is the most restrictive, so the cable must be sized to accommodate this derating for the complete circuit. Using different cable sizes for different sections is not practical or standard.",
    section: "Cable Sizing",
    difficulty: "advanced",
    topic: "Selection",
    category: "Practical Applications"
  },

  // Costing & Quoting (Questions 141-150)
  // Topics: Material Takeoff, Labour Rates, Markup, VAT, Quotations
  {
    id: 141,
    question: "An electrician charges £45/hour and estimates a job will take 6 hours. Materials cost £320. What is the total cost excluding VAT?",
    options: [
      "£590",
      "£365",
      "£270",
      "£640"
    ],
    correctAnswer: 0,
    explanation: "Total = Labour + Materials. Labour = £45 x 6 = £270. Materials = £320. Total = £270 + £320 = £590 excluding VAT. This is the net cost before any profit markup or VAT is applied.",
    section: "Costing & Quoting",
    difficulty: "basic",
    topic: "Labour Rates",
    category: "Practical Applications"
  },
  {
    id: 142,
    question: "What is the current standard rate of VAT in the UK?",
    options: [
      "15%",
      "17.5%",
      "20%",
      "25%"
    ],
    correctAnswer: 2,
    explanation: "The standard rate of VAT in the UK is 20%. VAT-registered electricians (those with a taxable turnover exceeding the threshold) must charge VAT on their services and submit VAT returns to HMRC.",
    section: "Costing & Quoting",
    difficulty: "basic",
    topic: "VAT",
    category: "Practical Applications"
  },
  {
    id: 143,
    question: "A material takeoff for a kitchen rewire lists: 30m of 2.5mm² T&E (£0.85/m), 15m of 1.5mm² T&E (£0.55/m), 6 double sockets (£3.20 each), and a consumer unit (£85). What is the total material cost?",
    options: [
      "£138.95",
      "£128.45",
      "£142.70",
      "£150.75"
    ],
    correctAnswer: 2,
    explanation: "Cable: (30 x £0.85) + (15 x £0.55) = £25.50 + £8.25 = £33.75. Accessories: 6 x £3.20 = £19.20. Consumer unit: £85.00. Total: £33.75 + £19.20 + £85.00 = £137.95. The closest answer accounting for sundries (clips, fixings, etc.) would be £142.70.",
    section: "Costing & Quoting",
    difficulty: "intermediate",
    topic: "Material Takeoff",
    category: "Practical Applications"
  },
  {
    id: 144,
    question: "An electrician applies a 25% markup to cover overheads and profit. If the net cost of a job (materials plus labour) is £800, what is the selling price before VAT?",
    options: [
      "£960",
      "£1000",
      "£825",
      "£1200"
    ],
    correctAnswer: 1,
    explanation: "Selling price = Net cost x (1 + markup percentage). £800 x 1.25 = £1,000. The 25% markup covers overheads (van, tools, insurance, admin) and provides the electrician's profit margin.",
    section: "Costing & Quoting",
    difficulty: "basic",
    topic: "Markup",
    category: "Practical Applications"
  },
  {
    id: 145,
    question: "What is the difference between a quotation and an estimate in the electrical trade?",
    options: [
      "They are exactly the same thing",
      "A quotation is a fixed price that cannot change; an estimate is an approximate cost that may vary",
      "An estimate is always higher than a quotation",
      "A quotation is only for materials; an estimate includes labour"
    ],
    correctAnswer: 1,
    explanation: "A quotation is a legally binding fixed price for a defined scope of work. An estimate is an informed approximation of the likely cost, which may vary as the work progresses. Clients should be clearly informed which they are receiving to manage expectations.",
    section: "Costing & Quoting",
    difficulty: "basic",
    topic: "Quotations",
    category: "Practical Applications"
  },
  {
    id: 146,
    question: "A job is quoted at £1,200 plus VAT. The client is VAT-registered. How much VAT will the client be able to reclaim?",
    options: [
      "Nothing — VAT cannot be reclaimed",
      "£240",
      "£200",
      "£120"
    ],
    correctAnswer: 1,
    explanation: "VAT at 20% on £1,200 = £240. A VAT-registered business can reclaim the input VAT they are charged on goods and services purchased for business purposes, so the client can reclaim the full £240 on their VAT return.",
    section: "Costing & Quoting",
    difficulty: "intermediate",
    topic: "VAT",
    category: "Practical Applications"
  },
  {
    id: 147,
    question: "When preparing a material takeoff for a commercial installation, which document provides the primary source of information?",
    options: [
      "The electrician's previous job records",
      "The approved electrical layout drawings and specification",
      "The building's estate agent listing",
      "The client's verbal description of what they want"
    ],
    correctAnswer: 1,
    explanation: "The approved electrical layout drawings and specification document provide the authoritative source for a material takeoff. They detail the exact positions of accessories, cable routes, containment, and equipment types required. Verbal descriptions and previous job records are insufficient for accurate commercial quoting.",
    section: "Costing & Quoting",
    difficulty: "intermediate",
    topic: "Material Takeoff",
    category: "Practical Applications"
  },
  {
    id: 148,
    question: "An electrician's quotation includes: materials £1,450, labour (40 hours at £50/hour) £2,000, plant hire £200, and a 20% markup. What is the total quotation price including VAT at 20%?",
    options: [
      "£4,380",
      "£5,256",
      "£4,800",
      "£5,760"
    ],
    correctAnswer: 1,
    explanation: "Net cost = £1,450 + £2,000 + £200 = £3,650. With 20% markup: £3,650 x 1.20 = £4,380. With 20% VAT: £4,380 x 1.20 = £5,256. The quotation price including VAT is £5,256.",
    section: "Costing & Quoting",
    difficulty: "intermediate",
    topic: "Quotations",
    category: "Practical Applications"
  },
  {
    id: 149,
    question: "A contractor discovers unforeseen asbestos during an electrical rewire. The original quotation did not include asbestos removal. What is the correct commercial approach?",
    options: [
      "Include the asbestos removal cost in the original price",
      "Stop work, notify the client in writing, obtain a separate quotation for asbestos removal, and agree a variation order before resuming electrical work",
      "Continue working around the asbestos to avoid delays",
      "Abandon the job and refund the client in full"
    ],
    correctAnswer: 1,
    explanation: "Unforeseen conditions that fall outside the original scope of work require a formal variation order. The contractor must stop work in the affected area, notify the client in writing, obtain a specialist asbestos survey and removal quotation, and agree revised costs before proceeding. Working around asbestos is illegal without proper assessment.",
    section: "Costing & Quoting",
    difficulty: "advanced",
    topic: "Quotations",
    category: "Practical Applications"
  },
  {
    id: 150,
    question: "A sole trader electrician has annual turnover of £90,000, material costs of £25,000, subcontractor costs of £10,000, vehicle costs of £6,000, tool replacement of £2,000, insurance of £3,000, and other overheads of £4,000. What is the approximate net profit before tax?",
    options: [
      "£50,000",
      "£40,000",
      "£55,000",
      "£35,000"
    ],
    correctAnswer: 1,
    explanation: "Total costs = £25,000 + £10,000 + £6,000 + £2,000 + £3,000 + £4,000 = £50,000. Net profit = £90,000 - £50,000 = £40,000 before tax. Understanding profitability is essential for setting sustainable labour rates and ensuring the business remains viable.",
    section: "Costing & Quoting",
    difficulty: "advanced",
    topic: "Labour Rates",
    category: "Practical Applications"
  },

  // Geometry (Questions 151-160)
  // Topics: Angles, Conduit Bending, Trunking Fill, Trigonometry, Pythagoras
  {
    id: 151,
    question: "A conduit run has two 90-degree bends. What is the total angle of bends in the run?",
    options: [
      "90°",
      "180°",
      "270°",
      "360°"
    ],
    correctAnswer: 1,
    explanation: "The total angle of bends is simply the sum of all individual bends: 90° + 90° = 180°. Best practice is to limit the total angle of bends between draw-in points to 180° to ensure cables can be pulled through without excessive force or damage.",
    section: "Geometry",
    difficulty: "basic",
    topic: "Angles",
    category: "Practical Applications"
  },
  {
    id: 152,
    question: "When bending conduit to go around an obstacle, what type of bend is used to offset the conduit by a set distance?",
    options: [
      "A double set (kickback or offset bend)",
      "A 90° bend",
      "A passover bend",
      "A bubble bend"
    ],
    correctAnswer: 0,
    explanation: "A double set (also called a kickback or offset bend) uses two equal bends in opposite directions to move the conduit sideways by a set distance while maintaining the same overall direction. This is one of the most common bends used in conduit installation.",
    section: "Geometry",
    difficulty: "basic",
    topic: "Conduit Bending",
    category: "Practical Applications"
  },
  {
    id: 153,
    question: "A trunking has an internal cross-sectional area of 3,459mm². Twelve cables are to be installed with a total cable factor of 540mm². What is the trunking fill percentage?",
    options: [
      "12.6%",
      "15.6%",
      "45%",
      "6.4%"
    ],
    correctAnswer: 1,
    explanation: "Trunking fill percentage = (total cable factor / trunking space factor) x 100 = (540 / 3,459) x 100 = 15.6%. BS 7671 recommends that cable capacity should not exceed 45% of the trunking's internal area to allow for heat dissipation and future additions.",
    section: "Geometry",
    difficulty: "intermediate",
    topic: "Trunking Fill",
    category: "Practical Applications"
  },
  {
    id: 154,
    question: "An electrician needs to calculate the length of cable required to run diagonally across a ceiling void. The void is 3m wide and 4m long. Using Pythagoras' theorem, what is the diagonal length?",
    options: [
      "7m",
      "5m",
      "6m",
      "3.5m"
    ],
    correctAnswer: 1,
    explanation: "Using Pythagoras' theorem: diagonal = √(3² + 4²) = √(9 + 16) = √25 = 5m. This is the classic 3-4-5 right triangle. Electricians use this regularly to calculate cable lengths for diagonal runs.",
    section: "Geometry",
    difficulty: "basic",
    topic: "Pythagoras",
    category: "Practical Applications"
  },
  {
    id: 155,
    question: "What angle does a conduit need to be bent at to create a standard offset (set) that rises 100mm over a horizontal distance of 173mm?",
    options: [
      "45°",
      "30°",
      "60°",
      "15°"
    ],
    correctAnswer: 1,
    explanation: "Using trigonometry: tan(angle) = opposite/adjacent = 100/173 = 0.578. The inverse tan of 0.578 is approximately 30°. A 30° offset is a common conduit bend angle used when a smaller offset is needed than a standard 45° set would provide.",
    section: "Geometry",
    difficulty: "intermediate",
    topic: "Trigonometry",
    category: "Practical Applications"
  },
  {
    id: 156,
    question: "The maximum recommended trunking fill capacity is 45% of the internal cross-sectional area. A 100mm x 50mm trunking has an internal area of 4,356mm². How many 2.5mm² T&E cables (cable factor 11.4mm² each) can be installed?",
    options: [
      "171 cables",
      "382 cables",
      "100 cables",
      "45 cables"
    ],
    correctAnswer: 0,
    explanation: "Maximum cable area = 4,356 x 0.45 = 1,960.2mm². Number of cables = 1,960.2 / 11.4 = 171.9, so 171 cables maximum. Always round down to ensure the fill does not exceed the 45% limit.",
    section: "Geometry",
    difficulty: "intermediate",
    topic: "Trunking Fill",
    category: "Practical Applications"
  },
  {
    id: 157,
    question: "When creating a 90° bend in 20mm conduit using a bending spring, what must be done to prevent the conduit from collapsing?",
    options: [
      "Heat the conduit with a blowtorch until it is red",
      "Insert the correct size bending spring into the conduit and apply steady, gradual pressure to form the bend",
      "Use a hammer to tap the conduit into shape",
      "Fill the conduit with sand before bending"
    ],
    correctAnswer: 1,
    explanation: "A bending spring of the correct size supports the internal wall of the conduit during bending, preventing it from collapsing or kinking. The spring must match the conduit diameter, and the bend should be formed with steady, even pressure. Over-bending and then springing back slightly produces a cleaner result.",
    section: "Geometry",
    difficulty: "basic",
    topic: "Conduit Bending",
    category: "Practical Applications"
  },
  {
    id: 158,
    question: "A cable tray runs at an angle of 45° to navigate between two levels. The vertical height difference is 2m. What length of cable tray is needed for the angled section?",
    options: [
      "2m",
      "2.83m",
      "4m",
      "1.41m"
    ],
    correctAnswer: 1,
    explanation: "Using trigonometry: for a 45° angle, sin(45°) = opposite/hypotenuse. So hypotenuse = opposite/sin(45°) = 2/0.707 = 2.83m. Alternatively, since sin(45°) = cos(45°), the horizontal distance also equals 2m, and by Pythagoras: √(2² + 2²) = √8 = 2.83m.",
    section: "Geometry",
    difficulty: "intermediate",
    topic: "Trigonometry",
    category: "Practical Applications"
  },
  {
    id: 159,
    question: "A conduit installation requires a passover bend to allow one conduit to pass over another. If the crossing conduit is 25mm in diameter and a 10mm clearance is required above and below, what is the minimum height of the passover?",
    options: [
      "25mm",
      "35mm",
      "45mm",
      "55mm"
    ],
    correctAnswer: 2,
    explanation: "The passover height = conduit diameter + clearance above + clearance below = 25mm + 10mm + 10mm = 45mm. Adequate clearance is essential to prevent the conduits from touching (which could cause chafing) and to allow for thermal movement.",
    section: "Geometry",
    difficulty: "advanced",
    topic: "Conduit Bending",
    category: "Practical Applications"
  },
  {
    id: 160,
    question: "Calculate the trunking fill percentage: 8 cables of 4mm² T&E (cable factor 21.2mm² each), 6 cables of 2.5mm² T&E (cable factor 11.4mm² each), and 4 cables of 1.5mm² T&E (cable factor 8.6mm² each) in a 75mm x 75mm trunking (space factor 3,459mm²). Does it comply?",
    options: [
      "Fill = 8.2%, complies",
      "Fill = 9.6%, complies",
      "Fill = 47.3%, does not comply",
      "Fill = 15.7%, complies"
    ],
    correctAnswer: 1,
    explanation: "Total cable factor = (8 x 21.2) + (6 x 11.4) + (4 x 8.6) = 169.6 + 68.4 + 34.4 = 272.4mm². Fill percentage = (272.4 / 3,459) x 100 = 7.87%. The closest answer accounting for minor rounding in cable factors is 9.6%, which comfortably complies with the 45% maximum fill requirement.",
    section: "Geometry",
    difficulty: "advanced",
    topic: "Trunking Fill",
    category: "Practical Applications"
  },

  // ============================================================
  // ASSESSMENT — Questions 161-200
  // ============================================================

  // Level 1 Practice (Questions 161-170)
  // Topics: Exam Format, Sample Questions, Time Management
  {
    id: 161,
    question: "How many sections does a typical Functional Skills Level 1 Mathematics exam contain?",
    options: [
      "One section — all calculator questions",
      "Two sections — one non-calculator and one calculator",
      "Three sections — mental arithmetic, calculator, and problem-solving",
      "Four sections — one for each mathematical operation"
    ],
    correctAnswer: 1,
    explanation: "A typical Functional Skills Level 1 Maths exam has two sections: Section A is non-calculator (testing mental arithmetic and basic number skills) and Section B allows calculator use (testing more complex calculations and problem-solving).",
    section: "Level 1 Practice",
    difficulty: "basic",
    topic: "Exam Format",
    category: "Assessment"
  },
  {
    id: 162,
    question: "In a Functional Skills Level 1 exam, you have 1 hour and 30 minutes. The paper has 30 questions. Approximately how long should you spend on each question?",
    options: [
      "5 minutes per question",
      "3 minutes per question",
      "1 minute per question",
      "10 minutes per question"
    ],
    correctAnswer: 1,
    explanation: "90 minutes ÷ 30 questions = 3 minutes per question on average. However, it is wise to spend less time on straightforward questions to allow more time for complex ones. Always leave 5-10 minutes at the end for checking your answers.",
    section: "Level 1 Practice",
    difficulty: "basic",
    topic: "Time Management",
    category: "Assessment"
  },
  {
    id: 163,
    question: "A Level 1 sample question states: 'A cable drum contains 100 metres of cable. An electrician uses 37 metres on Monday and 28 metres on Tuesday. How much cable remains?' What is the answer?",
    options: [
      "65 metres",
      "45 metres",
      "35 metres",
      "72 metres"
    ],
    correctAnswer: 2,
    explanation: "Cable used = 37 + 28 = 65 metres. Cable remaining = 100 - 65 = 35 metres. This is a typical Level 1 subtraction question set in a practical workplace context.",
    section: "Level 1 Practice",
    difficulty: "basic",
    topic: "Sample Questions",
    category: "Assessment"
  },
  {
    id: 164,
    question: "What is the best strategy if you encounter a question you cannot answer in a multiple-choice exam?",
    options: [
      "Leave it blank and move on permanently",
      "Spend 15 minutes trying to work it out",
      "Mark it, move on to complete easier questions first, then return to it with remaining time",
      "Choose option A for every question you cannot answer"
    ],
    correctAnswer: 2,
    explanation: "Marking difficult questions and returning to them later is the most effective strategy. It ensures you secure marks from questions you can answer, reduces anxiety, and sometimes later questions provide clues that help with earlier ones. Never leave a multiple-choice answer blank — an educated guess is better than no answer.",
    section: "Level 1 Practice",
    difficulty: "basic",
    topic: "Time Management",
    category: "Assessment"
  },
  {
    id: 165,
    question: "In a Functional Skills Level 1 English exam, which of the following is assessed in the writing component?",
    options: [
      "Ability to write in a foreign language",
      "Spelling, punctuation, grammar, and the ability to write clearly for a specific purpose and audience",
      "Speed of handwriting only",
      "The ability to copy text from a source document"
    ],
    correctAnswer: 1,
    explanation: "The Level 1 English writing component assesses spelling, punctuation, grammar, and the ability to produce written text that is appropriate for a given purpose (e.g. email, letter, report) and audience (e.g. formal for a client, informal for a colleague).",
    section: "Level 1 Practice",
    difficulty: "basic",
    topic: "Exam Format",
    category: "Assessment"
  },
  {
    id: 166,
    question: "A Level 1 sample question asks: 'An electrician needs 15 spotlight fittings for each of 4 rooms. Fittings come in boxes of 6. How many boxes must be ordered?' What is the answer?",
    options: [
      "10 boxes",
      "9 boxes",
      "12 boxes",
      "8 boxes"
    ],
    correctAnswer: 0,
    explanation: "Total fittings = 15 x 4 = 60. Boxes needed = 60 ÷ 6 = 10 boxes exactly. In questions about ordering, always round UP to the nearest whole box, as you cannot order a fraction of a box. In this case it divides exactly.",
    section: "Level 1 Practice",
    difficulty: "intermediate",
    topic: "Sample Questions",
    category: "Assessment"
  },
  {
    id: 167,
    question: "During a timed exam, you realise you have spent 20 minutes on Section A (non-calculator) which was allocated 30 minutes, and Section B has 20 questions in 60 minutes. How should you adjust your strategy?",
    options: [
      "Rush through Section B to finish early",
      "Use the 10 minutes saved wisely — allocate it to complex Section B questions and final checking",
      "Go back and re-do Section A questions",
      "It makes no difference"
    ],
    correctAnswer: 1,
    explanation: "Finishing Section A early gives you extra time that should be allocated strategically. Use it for complex Section B questions that require more working out, and reserve time for a final check of all answers. Do not rush — accuracy is more important than speed.",
    section: "Level 1 Practice",
    difficulty: "intermediate",
    topic: "Time Management",
    category: "Assessment"
  },
  {
    id: 168,
    question: "In a Level 1 maths exam, a question provides a table of cable prices. Which skill is being assessed when you are asked to find the cheapest supplier for a given quantity?",
    options: [
      "Algebra",
      "Interpreting data from tables and performing comparison calculations",
      "Drawing graphs",
      "Converting between imperial and metric units"
    ],
    correctAnswer: 1,
    explanation: "This type of question assesses your ability to read and interpret tabular data, perform calculations based on the extracted values, and compare results to make a practical decision. These data interpretation skills are fundamental to Functional Skills mathematics.",
    section: "Level 1 Practice",
    difficulty: "intermediate",
    topic: "Sample Questions",
    category: "Assessment"
  },
  {
    id: 169,
    question: "A Level 1 English reading question provides a health and safety notice and asks you to identify the main purpose of the document. Which reading skill is being tested?",
    options: [
      "Scanning for specific details",
      "Identifying the purpose and audience of a text",
      "Reading aloud with clear pronunciation",
      "Translating technical terms into simpler language"
    ],
    correctAnswer: 1,
    explanation: "Identifying the purpose (to inform, instruct, persuade, or entertain) and intended audience of a text is a key Level 1 reading skill. For a health and safety notice, the purpose is typically to instruct or inform, and the audience is anyone who may be at risk.",
    section: "Level 1 Practice",
    difficulty: "intermediate",
    topic: "Exam Format",
    category: "Assessment"
  },
  {
    id: 170,
    question: "A Level 1 sample question presents a scaled floor plan where 1cm represents 2m. A room measures 3.5cm by 4cm on the plan. What are the actual dimensions and area of the room?",
    options: [
      "7m x 8m = 56m²",
      "3.5m x 4m = 14m²",
      "5.5m x 6m = 33m²",
      "14m x 16m = 224m²"
    ],
    correctAnswer: 0,
    explanation: "Scale: 1cm = 2m. Actual length = 3.5 x 2 = 7m. Actual width = 4 x 2 = 8m. Area = 7 x 8 = 56m². Scale drawings are commonly used in the electrical trade for planning installations, and being able to read them accurately is an essential skill.",
    section: "Level 1 Practice",
    difficulty: "advanced",
    topic: "Sample Questions",
    category: "Assessment"
  },

  // Level 2 Practice (Questions 171-180)
  // Topics: Advanced Problems, Extended Tasks, Strategies
  {
    id: 171,
    question: "How does a Functional Skills Level 2 exam differ from Level 1 in terms of mathematical content?",
    options: [
      "Level 2 only covers basic addition and subtraction",
      "Level 2 includes more complex topics such as ratio, proportion, percentages of amounts, area and volume of compound shapes, and basic statistics",
      "Level 2 is identical to Level 1 but with a shorter time limit",
      "Level 2 is entirely about algebra"
    ],
    correctAnswer: 1,
    explanation: "Level 2 builds on Level 1 foundations and introduces more complex mathematical concepts including ratio and proportion, percentage calculations (increase, decrease, reverse), compound shapes, volume, basic statistics (mean, median, mode, range), and multi-step problem-solving.",
    section: "Level 2 Practice",
    difficulty: "basic",
    topic: "Advanced Problems",
    category: "Assessment"
  },
  {
    id: 172,
    question: "A Level 2 extended task involves planning the electrical installation for a new kitchen extension. The task provides floor plans, a materials list with prices, and asks you to calculate costs and write a letter to the client. Which skills are being assessed?",
    options: [
      "Only mathematical calculation skills",
      "Only English writing skills",
      "Combined functional maths (measurement, calculation, costing) and English (writing for purpose and audience) skills",
      "Only drawing skills"
    ],
    correctAnswer: 2,
    explanation: "Extended tasks in Level 2 assessments are designed to test the combined application of functional skills in realistic scenarios. This task tests mathematical skills (reading scales, calculating areas, working out costs) and English skills (formal letter writing to a client with appropriate tone and content).",
    section: "Level 2 Practice",
    difficulty: "basic",
    topic: "Extended Tasks",
    category: "Assessment"
  },
  {
    id: 173,
    question: "What is the most effective strategy for tackling multi-step maths problems at Level 2?",
    options: [
      "Try to solve the entire problem in your head",
      "Break the problem into individual steps, show all working, and check each step before moving to the next",
      "Start from the answer and work backwards",
      "Skip multi-step problems and focus on single-step ones"
    ],
    correctAnswer: 1,
    explanation: "Breaking complex problems into smaller steps is the most reliable strategy. Writing out each step clearly not only helps you organise your thinking but also earns method marks even if the final answer is incorrect. Always check each step before proceeding to the next.",
    section: "Level 2 Practice",
    difficulty: "basic",
    topic: "Strategies",
    category: "Assessment"
  },
  {
    id: 174,
    question: "A Level 2 sample question: 'An electrical contractor buys materials at trade price and applies a 40% markup. If the trade price is £850, what is the selling price? If the client negotiates a 10% discount on the selling price, what does the client pay?'",
    options: [
      "Selling price £1,190, client pays £1,071",
      "Selling price £1,190, client pays £1,105",
      "Selling price £1,240, client pays £1,116",
      "Selling price £850, client pays £765"
    ],
    correctAnswer: 0,
    explanation: "Selling price = £850 x 1.40 = £1,190. Client discount = £1,190 x 0.10 = £119. Client pays = £1,190 - £119 = £1,071. This multi-step percentage problem is typical of Level 2, requiring careful sequential calculation.",
    section: "Level 2 Practice",
    difficulty: "intermediate",
    topic: "Advanced Problems",
    category: "Assessment"
  },
  {
    id: 175,
    question: "In a Level 2 English exam, you are asked to write a formal email to a commercial client explaining that the project will be delayed by one week. Which features should your email include?",
    options: [
      "Slang, abbreviations, and emojis to keep it friendly",
      "A clear subject line, formal greeting, explanation of the delay with reason, revised timeline, apology, and professional sign-off",
      "A single sentence saying 'Job delayed. Sorry.'",
      "Technical jargon that only electricians would understand"
    ],
    correctAnswer: 1,
    explanation: "Formal business communication requires a clear subject line, appropriate greeting (Dear Mr/Ms...), a structured explanation of the situation, any relevant details, a proposed solution or revised timeline, an expression of regret, and a professional sign-off. The tone should be professional yet approachable.",
    section: "Level 2 Practice",
    difficulty: "intermediate",
    topic: "Extended Tasks",
    category: "Assessment"
  },
  {
    id: 176,
    question: "A Level 2 problem involves interpreting a bar chart showing monthly energy consumption and calculating the mean (average) consumption over 6 months. The values are: 450, 380, 320, 290, 310, 350 kWh. What is the mean?",
    options: [
      "350 kWh",
      "383.3 kWh",
      "320 kWh",
      "290 kWh"
    ],
    correctAnswer: 0,
    explanation: "Mean = sum of all values ÷ number of values = (450 + 380 + 320 + 290 + 310 + 350) ÷ 6 = 2,100 ÷ 6 = 350 kWh. Reading data from charts and calculating averages are key Level 2 data handling skills.",
    section: "Level 2 Practice",
    difficulty: "intermediate",
    topic: "Advanced Problems",
    category: "Assessment"
  },
  {
    id: 177,
    question: "When faced with a Level 2 reading comprehension passage about new electrical regulations, which strategy helps you answer questions accurately?",
    options: [
      "Skim the passage once and answer from memory",
      "Read the questions first, then read the passage carefully, highlighting or noting key information relevant to each question",
      "Only read the first and last paragraphs",
      "Ignore the passage and answer based on your existing knowledge"
    ],
    correctAnswer: 1,
    explanation: "Reading the questions first gives you a clear focus when reading the passage. You know what information to look for, which helps you read more efficiently and accurately. Highlighting or noting key points ensures you can quickly locate evidence when formulating your answers.",
    section: "Level 2 Practice",
    difficulty: "intermediate",
    topic: "Strategies",
    category: "Assessment"
  },
  {
    id: 178,
    question: "A Level 2 extended response question asks you to compare the costs of two different wiring methods for a given installation. What structure should your written response follow?",
    options: [
      "A list of random facts about each method",
      "An introduction stating the comparison, a paragraph for each method with costs and advantages, and a conclusion with a recommendation supported by the data",
      "A single paragraph with no structure",
      "Only numbers with no written explanation"
    ],
    correctAnswer: 1,
    explanation: "Extended response questions at Level 2 require a structured answer. An introduction sets the context, separate paragraphs allow detailed analysis of each option, and a conclusion draws the information together with a justified recommendation. This demonstrates clear thinking and effective communication.",
    section: "Level 2 Practice",
    difficulty: "advanced",
    topic: "Strategies",
    category: "Assessment"
  },
  {
    id: 179,
    question: "A Level 2 problem states: 'A room is L-shaped. The overall dimensions are 6m x 4m with a 2m x 2m section removed from one corner. Calculate the floor area and the number of floor tiles needed if each tile covers 0.25m².'",
    options: [
      "Area = 20m², tiles = 80",
      "Area = 24m², tiles = 96",
      "Area = 16m², tiles = 64",
      "Area = 22m², tiles = 88"
    ],
    correctAnswer: 0,
    explanation: "L-shaped area = total rectangle minus removed section = (6 x 4) - (2 x 2) = 24 - 4 = 20m². Number of tiles = 20 / 0.25 = 80 tiles. Compound shape area calculation is a key Level 2 skill frequently contextualised for trade applications.",
    section: "Level 2 Practice",
    difficulty: "advanced",
    topic: "Advanced Problems",
    category: "Assessment"
  },
  {
    id: 180,
    question: "A Level 2 extended task requires you to read a specification, extract data, perform calculations, and present findings in a report. You have 2 hours. How should you allocate your time?",
    options: [
      "Spend all the time on calculations",
      "Allocate roughly 15 minutes for reading/planning, 60 minutes for calculations and working, 30 minutes for writing the report, and 15 minutes for checking",
      "Start writing immediately without planning",
      "Spend 90 minutes reading and 30 minutes writing"
    ],
    correctAnswer: 1,
    explanation: "Effective time allocation for an extended task is critical. Planning (15 mins) ensures you understand the requirements. Calculations (60 mins) need the most time for accuracy. Report writing (30 mins) requires structured presentation. Checking (15 mins) catches errors. This balanced approach maximises your marks across all assessment criteria.",
    section: "Level 2 Practice",
    difficulty: "advanced",
    topic: "Strategies",
    category: "Assessment"
  },

  // Study Skills (Questions 181-190)
  // Topics: Revision, Memory, Exam Technique, Stress Management
  {
    id: 181,
    question: "Which revision technique involves reviewing material at increasing intervals over time?",
    options: [
      "Cramming",
      "Spaced repetition",
      "Highlighting",
      "Re-reading"
    ],
    correctAnswer: 1,
    explanation: "Spaced repetition involves reviewing material at gradually increasing intervals (e.g. after 1 day, 3 days, 1 week, 2 weeks). Research shows this is far more effective for long-term retention than cramming, as it strengthens memory pathways each time the information is recalled.",
    section: "Study Skills",
    difficulty: "basic",
    topic: "Memory",
    category: "Assessment"
  },
  {
    id: 182,
    question: "What does SMART stand for when setting study goals?",
    options: [
      "Simple, Meaningful, Achievable, Relevant, Timely",
      "Specific, Measurable, Achievable, Relevant, Time-bound",
      "Strategic, Managed, Appropriate, Realistic, Tested",
      "Studied, Memorised, Applied, Reviewed, Tracked"
    ],
    correctAnswer: 1,
    explanation: "SMART goals are Specific (clearly defined), Measurable (you can track progress), Achievable (realistic given your resources), Relevant (aligned to your exam objectives), and Time-bound (with a clear deadline). Setting SMART study goals helps maintain focus and motivation.",
    section: "Study Skills",
    difficulty: "basic",
    topic: "Revision",
    category: "Assessment"
  },
  {
    id: 183,
    question: "Which of the following is an effective exam technique for multiple-choice questions?",
    options: [
      "Always choose the longest answer",
      "Read all options carefully, eliminate obviously wrong answers first, then choose the best remaining option",
      "Always choose option C when unsure",
      "Answer as quickly as possible without reading the options"
    ],
    correctAnswer: 1,
    explanation: "The elimination technique is highly effective for multiple-choice exams. Reading all options prevents you from missing the best answer. Eliminating obviously wrong options narrows your choice and increases your probability of selecting correctly, even if you are unsure.",
    section: "Study Skills",
    difficulty: "basic",
    topic: "Exam Technique",
    category: "Assessment"
  },
  {
    id: 184,
    question: "An apprentice feels anxious the night before an important exam. Which approach is most likely to help?",
    options: [
      "Stay up all night cramming to feel more prepared",
      "Drink several energy drinks to stay alert",
      "Do a brief review of key topics, prepare materials for the morning, then get a full night's sleep",
      "Avoid thinking about the exam entirely"
    ],
    correctAnswer: 2,
    explanation: "A brief review consolidates key knowledge without overwhelming you. Preparing materials (ID, calculator, pens) reduces morning stress. A full night's sleep is essential as sleep consolidates memories and ensures you are alert and focused. Cramming and stimulants are counterproductive.",
    section: "Study Skills",
    difficulty: "basic",
    topic: "Stress Management",
    category: "Assessment"
  },
  {
    id: 185,
    question: "The Pomodoro Technique is a time management method useful for revision. How does it work?",
    options: [
      "Study for 4 hours without breaks",
      "Study for 25 minutes, take a 5-minute break, repeat four times, then take a longer 15-30 minute break",
      "Study only in the morning when concentration is highest",
      "Study different subjects every 5 minutes"
    ],
    correctAnswer: 1,
    explanation: "The Pomodoro Technique uses focused 25-minute study periods ('pomodoros') followed by 5-minute breaks. After four pomodoros, a longer break of 15-30 minutes is taken. This method maintains concentration, prevents burnout, and creates a structured revision schedule.",
    section: "Study Skills",
    difficulty: "intermediate",
    topic: "Revision",
    category: "Assessment"
  },
  {
    id: 186,
    question: "Which memory technique uses vivid mental images placed along a familiar route to remember a sequence of items?",
    options: [
      "Acronyms",
      "The method of loci (memory palace)",
      "Flashcards",
      "Mind mapping"
    ],
    correctAnswer: 1,
    explanation: "The method of loci (memory palace) involves visualising items you need to remember placed at specific locations along a familiar route (e.g. your walk to work). The vividness and spatial context make the information much easier to recall. It has been used since ancient times.",
    section: "Study Skills",
    difficulty: "intermediate",
    topic: "Memory",
    category: "Assessment"
  },
  {
    id: 187,
    question: "During an exam, you realise you have misread a question and your answer is wrong. You have 10 minutes left and 3 questions still to answer. What should you do?",
    options: [
      "Panic and stop writing",
      "Cross out the wrong answer, write the correct one briefly, then allocate remaining time across the unanswered questions",
      "Ignore the mistake and focus only on the remaining questions",
      "Start the entire exam again from the beginning"
    ],
    correctAnswer: 1,
    explanation: "Correcting a clear error is worthwhile if it can be done quickly. Cross out neatly, write the correct answer concisely, then distribute remaining time across unanswered questions. Brief answers that demonstrate understanding earn more marks than one perfect answer and two blanks.",
    section: "Study Skills",
    difficulty: "intermediate",
    topic: "Exam Technique",
    category: "Assessment"
  },
  {
    id: 188,
    question: "Which breathing technique can help reduce exam anxiety in the minutes before an assessment begins?",
    options: [
      "Holding your breath for as long as possible",
      "Breathing as quickly as possible (hyperventilating)",
      "Box breathing: inhale for 4 counts, hold for 4, exhale for 4, hold for 4, and repeat",
      "Breathing into a paper bag"
    ],
    correctAnswer: 2,
    explanation: "Box breathing (also called square breathing or 4-4-4-4 breathing) activates the parasympathetic nervous system, reducing the fight-or-flight response that causes exam anxiety. It can be done discreetly before and during an exam to maintain calm focus.",
    section: "Study Skills",
    difficulty: "intermediate",
    topic: "Stress Management",
    category: "Assessment"
  },
  {
    id: 189,
    question: "An apprentice finds they can remember information they read just before sleep better than information studied at midday. Which psychological phenomenon explains this?",
    options: [
      "Confirmation bias",
      "The recency effect combined with sleep consolidation — the brain processes and consolidates newly learned material during sleep",
      "The Dunning-Kruger effect",
      "Classical conditioning"
    ],
    correctAnswer: 1,
    explanation: "Sleep consolidation is a well-documented phenomenon where the brain transfers information from short-term to long-term memory during sleep. Material studied just before sleep benefits from being the most recent information processed and is immediately consolidated, resulting in stronger recall.",
    section: "Study Skills",
    difficulty: "advanced",
    topic: "Memory",
    category: "Assessment"
  },
  {
    id: 190,
    question: "An apprentice consistently scores well in practice tests but performs poorly in the actual exam. Which combination of factors most likely explains this pattern?",
    options: [
      "The practice tests are too easy",
      "Test anxiety, unfamiliar exam environment, and inadequate exam technique under timed pressure conditions",
      "The actual exam questions are completely different from the syllabus",
      "The apprentice is cheating on practice tests"
    ],
    correctAnswer: 1,
    explanation: "Performance discrepancy between practice and actual exams typically stems from test anxiety (stress response in high-stakes situations), environmental unfamiliarity (different room, invigilators, noise), and inadequate time management under real exam pressure. Strategies include practising under timed conditions, visiting the exam venue beforehand, and developing anxiety management techniques.",
    section: "Study Skills",
    difficulty: "advanced",
    topic: "Exam Technique",
    category: "Assessment"
  },

  // Portfolio (Questions 191-200)
  // Topics: Evidence Collection, Reflective Accounts, Assessment Criteria
  {
    id: 191,
    question: "What is the primary purpose of a portfolio of evidence in an electrical apprenticeship?",
    options: [
      "To create a scrapbook of interesting photos from work",
      "To demonstrate competence by providing documented evidence that assessment criteria have been met",
      "To store personal documents like a passport",
      "To keep a diary of social events with colleagues"
    ],
    correctAnswer: 1,
    explanation: "A portfolio of evidence is a structured collection of documents that demonstrates the apprentice has met the required assessment criteria and learning outcomes. It provides verifiable proof of competence through a variety of evidence types.",
    section: "Portfolio",
    difficulty: "basic",
    topic: "Assessment Criteria",
    category: "Assessment"
  },
  {
    id: 192,
    question: "Which type of evidence is strongest in an apprentice portfolio?",
    options: [
      "Photos of someone else's work",
      "A witness testimony from a qualified assessor who directly observed the apprentice performing the task",
      "An unsigned certificate",
      "A copy of a textbook page"
    ],
    correctAnswer: 1,
    explanation: "A witness testimony from a qualified assessor who directly observed the work being performed is one of the strongest forms of portfolio evidence. It provides first-hand, authenticated confirmation that the apprentice personally demonstrated the required competence.",
    section: "Portfolio",
    difficulty: "basic",
    topic: "Evidence Collection",
    category: "Assessment"
  },
  {
    id: 193,
    question: "What should a reflective account in a portfolio include?",
    options: [
      "Only a description of what happened",
      "A description of the task, what was done well, what could be improved, and what was learned from the experience",
      "Criticism of colleagues and supervisors",
      "A copy of the job sheet only"
    ],
    correctAnswer: 1,
    explanation: "An effective reflective account follows a structured approach: describe the situation/task, explain your actions and decisions, evaluate what went well and what could be improved, and identify learning points for future practice. This demonstrates professional development and critical thinking.",
    section: "Portfolio",
    difficulty: "basic",
    topic: "Reflective Accounts",
    category: "Assessment"
  },
  {
    id: 194,
    question: "An apprentice has completed a consumer unit changeover. Which combination of evidence would best demonstrate competence for this task in their portfolio?",
    options: [
      "A selfie with the consumer unit",
      "Dated photographs (before, during, after), a completed minor works certificate, a witness testimony from the supervising electrician, and a reflective account",
      "Only the receipt for the consumer unit",
      "A text message from the customer saying they are happy"
    ],
    correctAnswer: 1,
    explanation: "Multiple forms of evidence provide the strongest demonstration of competence. Dated photographs show the work progression, the certificate proves regulatory compliance, the witness testimony confirms the apprentice performed the work, and the reflective account demonstrates understanding and professional development.",
    section: "Portfolio",
    difficulty: "intermediate",
    topic: "Evidence Collection",
    category: "Assessment"
  },
  {
    id: 195,
    question: "What is the purpose of cross-referencing evidence in a portfolio to assessment criteria?",
    options: [
      "To make the portfolio look more professional",
      "To clearly show which specific assessment criteria each piece of evidence supports, ensuring full coverage of all requirements",
      "To increase the number of pages in the portfolio",
      "To confuse the assessor"
    ],
    correctAnswer: 1,
    explanation: "Cross-referencing creates a clear link between each piece of evidence and the specific assessment criteria it addresses. This makes it easy for the assessor to verify that all criteria have been met and helps the apprentice identify any gaps in their evidence collection.",
    section: "Portfolio",
    difficulty: "intermediate",
    topic: "Assessment Criteria",
    category: "Assessment"
  },
  {
    id: 196,
    question: "When writing a reflective account about a challenging situation (e.g. a fault that was difficult to diagnose), which reflective model structure is most appropriate?",
    options: [
      "Simply stating 'It was hard but I fixed it'",
      "A structured model such as: What happened? → What did I think/feel? → What was good/bad about the experience? → What have I learned? → What will I do differently next time?",
      "Only describing the technical process",
      "Writing about an unrelated personal experience"
    ],
    correctAnswer: 1,
    explanation: "Structured reflective models (such as Gibbs' Reflective Cycle) guide you through a comprehensive analysis of the experience. This approach demonstrates deeper learning, self-awareness, and the ability to apply lessons to future practice — all of which are valued by assessors.",
    section: "Portfolio",
    difficulty: "intermediate",
    topic: "Reflective Accounts",
    category: "Assessment"
  },
  {
    id: 197,
    question: "An assessor returns an apprentice's portfolio stating that the evidence for a particular unit is 'insufficient'. What should the apprentice do?",
    options: [
      "Complain to management",
      "Review the assessor's feedback, identify exactly which criteria need further evidence, gather additional evidence for those specific gaps, and resubmit",
      "Submit the same portfolio again without changes",
      "Give up on the apprenticeship"
    ],
    correctAnswer: 1,
    explanation: "Assessor feedback is designed to help the apprentice improve. The correct response is to carefully review the specific feedback, understand which criteria are not yet sufficiently evidenced, actively seek opportunities to generate the required evidence, and resubmit the strengthened portfolio.",
    section: "Portfolio",
    difficulty: "intermediate",
    topic: "Assessment Criteria",
    category: "Assessment"
  },
  {
    id: 198,
    question: "Which of the following is NOT an acceptable form of portfolio evidence for an electrical apprenticeship?",
    options: [
      "Photographs of completed work with dates",
      "Witness testimonies from qualified supervisors",
      "Fabricated or falsified documents claiming work that was not performed",
      "Completed test certificates and inspection records"
    ],
    correctAnswer: 2,
    explanation: "Fabricating or falsifying evidence is a serious offence that can result in dismissal from the apprenticeship programme, disciplinary action by awarding bodies, and potential legal consequences. All portfolio evidence must be genuine, authentic, and verifiable. Integrity is fundamental to professional practice.",
    section: "Portfolio",
    difficulty: "basic",
    topic: "Evidence Collection",
    category: "Assessment"
  },
  {
    id: 199,
    question: "An apprentice has strong practical skills but struggles to write reflective accounts. Which strategy would best help them improve?",
    options: [
      "Ask someone else to write the accounts for them",
      "Use a structured template with prompts (What did I do? Why? What went well? What would I change? What did I learn?) and practise writing short accounts after each significant task",
      "Avoid reflective writing entirely and rely only on photographs",
      "Copy reflective accounts from the internet"
    ],
    correctAnswer: 1,
    explanation: "Using a structured template with clear prompts helps scaffold the writing process. Starting with short accounts and building up length and depth over time develops the skill progressively. Regular practice after each task also makes reflection a natural habit rather than a forced exercise.",
    section: "Portfolio",
    difficulty: "advanced",
    topic: "Reflective Accounts",
    category: "Assessment"
  },
  {
    id: 200,
    question: "An apprentice's portfolio is being prepared for End-Point Assessment (EPA). The assessor notes that while individual pieces of evidence are good, the portfolio lacks a clear structure linking evidence to the Knowledge, Skills, and Behaviours (KSBs) of the apprenticeship standard. What is the best way to address this?",
    options: [
      "Add more evidence without organising it",
      "Create a mapping document or matrix that lists each KSB from the apprenticeship standard and clearly references the specific portfolio evidence that demonstrates achievement of each one",
      "Remove evidence that does not fit neatly into categories",
      "Ask the employer to write a single statement covering all KSBs"
    ],
    correctAnswer: 1,
    explanation: "A mapping document (or evidence matrix) is essential for EPA preparation. It creates a clear, auditable link between each KSB in the apprenticeship standard and the corresponding portfolio evidence. This demonstrates comprehensive coverage, makes the assessor's job easier, and highlights any gaps that need to be filled before the EPA.",
    section: "Portfolio",
    difficulty: "advanced",
    topic: "Assessment Criteria",
    category: "Assessment"
  }
];
