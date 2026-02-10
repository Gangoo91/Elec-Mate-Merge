import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  HardHat,
  Eye,
  Ear,
  Hand,
  Footprints,
  Wind,
  Shirt,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ppe-last-resort",
    question:
      "Where does PPE sit in the hierarchy of controls?",
    options: [
      "It is the first control measure an employer should consider",
      "It should be used alongside elimination and substitution as equal measures",
      "It is the last resort — used only when risks cannot be adequately controlled by other means",
      "It replaces the need for engineering controls on most construction sites",
    ],
    correctIndex: 2,
    explanation:
      "PPE is always the last resort in the hierarchy of controls. Employers must first consider elimination, substitution, engineering controls, and administrative controls before relying on PPE. It should only be used when residual risk remains after all higher-level controls have been applied.",
  },
  {
    id: "hearing-action-levels",
    question:
      "At what daily noise exposure level must an employer provide hearing protection to workers who request it?",
    options: [
      "75 dB(A) — the lower awareness level",
      "80 dB(A) — the lower exposure action value",
      "85 dB(A) — the upper exposure action value",
      "87 dB(A) — the exposure limit value",
    ],
    correctIndex: 1,
    explanation:
      "Under the Control of Noise at Work Regulations 2005, at the lower exposure action value of 80 dB(A) daily personal exposure, the employer must make hearing protection available to any worker who requests it. At 85 dB(A) (the upper action value), the employer must ensure hearing protection is worn in designated hearing protection zones.",
  },
  {
    id: "face-fit-testing",
    question:
      "Why is face-fit testing essential for tight-fitting respiratory protective equipment?",
    options: [
      "It is only required for comfort — it does not affect the level of protection",
      "It ensures the facepiece forms an adequate seal against the wearer's face so that contaminated air cannot leak in around the edges",
      "It is a legal requirement only when working with asbestos, not for other hazards",
      "It confirms that the filter cartridge is the correct type for the hazard",
    ],
    correctIndex: 1,
    explanation:
      "Face-fit testing checks that a tight-fitting facepiece (disposable mask or reusable respirator) makes an adequate seal against the individual wearer's face. Without a proper seal, contaminated air can leak in around the edges, dramatically reducing the level of protection. Face-fit testing is required under COSHH and the Control of Asbestos Regulations for any tight-fitting RPE.",
  },
];

const faqs = [
  {
    question:
      "Who is responsible for providing PPE on a construction site?",
    answer:
      "Under the Personal Protective Equipment at Work Regulations 1992 (as amended 2022), the employer is responsible for providing suitable PPE free of charge to employees who need it. For self-employed workers on construction sites, the principal contractor and client also have duties under CDM 2015 to ensure adequate PPE arrangements are in place. The employer must assess the risks, select appropriate PPE, provide it free of charge, ensure it fits correctly, provide training on its use, and maintain and replace it as necessary.",
  },
  {
    question:
      "How often should PPE be inspected and replaced?",
    answer:
      "PPE should be inspected before every use by the wearer, checking for visible damage, wear, contamination, or deterioration. More detailed inspections should be carried out at intervals determined by the manufacturer's guidance and the conditions of use. Hard hats should be replaced after any significant impact, if cracked or damaged, or in accordance with the manufacturer's recommended service life (typically 3 to 5 years). Safety boots should be replaced when the sole is worn, the toe cap is damaged, or the boot no longer provides adequate support. RPE filters must be replaced according to the manufacturer's schedule and the exposure conditions.",
  },
  {
    question:
      "Can an employer charge employees for PPE?",
    answer:
      "No. Under the PPE at Work Regulations 1992 (as amended 2022), employers must provide PPE free of charge wherever it is required to protect against workplace risks. This includes replacement PPE when existing items become worn, damaged, or contaminated. The employer may not make deductions from wages or require a deposit for PPE. The only exception is where PPE is also used outside of work (for example, if an employee chooses to use their own prescription safety glasses), but even then the employer must offer a free alternative.",
  },
  {
    question:
      "What is the difference between CE marking and UKCA marking on PPE?",
    answer:
      "CE (Conformit\u00e9 Europ\u00e9enne) marking indicates that PPE meets the essential health and safety requirements of the European PPE Regulation (EU) 2016/425. UKCA (UK Conformity Assessed) marking is the UK equivalent, introduced following Brexit, confirming that PPE meets the requirements of the UK PPE Regulations. During the transition period, both CE and UKCA marked PPE can be sold and used in Great Britain. From 1 January 2025, new PPE placed on the GB market must carry the UKCA mark (though CE marked PPE already in use remains valid). Always check that PPE carries the appropriate conformity marking for the jurisdiction in which it is being used.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under the PPE at Work Regulations 1992 (as amended 2022), when should PPE be provided?",
    options: [
      "As the first line of defence against all workplace hazards",
      "Only when employees specifically request it",
      "When risks cannot be adequately controlled by other means",
      "Only for high-risk activities such as demolition and asbestos removal",
    ],
    correctAnswer: 2,
    explanation:
      "PPE should be provided when risks cannot be adequately controlled by other, more effective means — such as elimination, substitution, engineering controls, or safe systems of work. PPE is always the last resort in the hierarchy of controls.",
  },
  {
    id: 2,
    question:
      "Which European standard applies to industrial safety helmets (hard hats)?",
    options: [
      "EN 166",
      "EN 388",
      "EN 397",
      "EN ISO 20345",
    ],
    correctAnswer: 2,
    explanation:
      "EN 397 is the European standard for industrial safety helmets (hard hats). It specifies requirements for shock absorption, penetration resistance, and flame resistance. EN 166 covers eye protection, EN 388 covers protective gloves, and EN ISO 20345 covers safety footwear.",
  },
  {
    id: 3,
    question:
      "What does the SNR rating on hearing protection indicate?",
    options: [
      "The safety number rating — an overall quality score",
      "The Single Number Rating — the overall noise reduction in decibels",
      "The standardised noise resistance — the maximum noise level the protector can withstand",
      "The supplier's national registration number",
    ],
    correctAnswer: 1,
    explanation:
      "SNR stands for Single Number Rating. It indicates the overall noise reduction (attenuation) provided by the hearing protector in decibels. For example, hearing protection with an SNR of 30 dB will reduce the noise level reaching the ear by approximately 30 dB. In practice, the real-world attenuation is often lower, so a reduction factor is commonly applied.",
  },
  {
    id: 4,
    question:
      "Under the Control of Noise at Work Regulations 2005, at what daily exposure level must an employer ensure that hearing protection is worn?",
    options: [
      "75 dB(A)",
      "80 dB(A) — the lower exposure action value",
      "85 dB(A) — the upper exposure action value",
      "87 dB(A) — the exposure limit value",
    ],
    correctAnswer: 2,
    explanation:
      "At the upper exposure action value of 85 dB(A), the employer must ensure that hearing protection is worn in designated hearing protection zones. At 80 dB(A) (the lower action value), hearing protection must be made available to workers who request it. The exposure limit value of 87 dB(A) must not be exceeded (taking hearing protection into account).",
  },
  {
    id: 5,
    question:
      "What do the EN 388 markings on protective gloves indicate?",
    options: [
      "The glove's resistance to heat and flame",
      "The glove's chemical permeation resistance",
      "The glove's mechanical performance — abrasion, cut, tear, and puncture resistance",
      "The glove's electrical insulation rating",
    ],
    correctAnswer: 2,
    explanation:
      "EN 388 markings indicate the glove's mechanical performance across four key hazards: abrasion resistance, blade cut resistance, tear resistance, and puncture resistance. Each is rated on a scale (typically 1-4 or 1-5), with higher numbers indicating better performance. Some gloves also include ratings for impact protection (EN 388:2016 added a letter P for this).",
  },
  {
    id: 6,
    question:
      "A worker is required to use a tight-fitting FFP3 disposable mask for asbestos work. What additional requirement must be met?",
    options: [
      "The worker must hold a CSCS card with an asbestos endorsement",
      "The mask must be face-fit tested to the individual wearer",
      "The worker must wear the mask for at least 30 minutes before the task to acclimatise",
      "The mask must be shared only with workers of a similar face shape",
    ],
    correctAnswer: 1,
    explanation:
      "Under the Control of Asbestos Regulations 2012, any tight-fitting RPE used for asbestos work must be face-fit tested to the individual wearer. This ensures the facepiece forms an adequate seal against the face. Face-fit testing must be repeated whenever the wearer's face shape changes significantly (e.g., weight change, dental work) or when a different model of RPE is used.",
  },
  {
    id: 7,
    question:
      "Which class of high-visibility clothing provides the greatest area of fluorescent and retroreflective material?",
    options: [
      "Class 1 — suitable for all construction site work",
      "Class 2 — the standard requirement for most sites",
      "Class 3 — the highest visibility class under EN ISO 20471",
      "Class 4 — the specialist construction class",
    ],
    correctAnswer: 2,
    explanation:
      "EN ISO 20471 defines three classes of high-visibility clothing. Class 3 provides the greatest area of fluorescent background material and retroreflective strips, offering the highest level of conspicuity. Class 3 garments are typically full jackets or coveralls. Class 2 includes vests and waistcoats. Class 1 offers the lowest area of material (e.g., belts or armbands) and is generally not sufficient for construction sites.",
  },
  {
    id: 8,
    question:
      "What is the employer's duty regarding PPE training?",
    options: [
      "Training is only required for Category III (complex) PPE",
      "A written instruction sheet is sufficient — no practical training is needed",
      "The employer must provide information, instruction, and training on the correct use, maintenance, and storage of all PPE provided",
      "Training is only required when an employee is under 18 years of age",
    ],
    correctAnswer: 2,
    explanation:
      "Under the PPE at Work Regulations 1992 (as amended 2022), the employer must provide adequate information, instruction, and training to ensure that each employee who is provided with PPE knows the risks the PPE is designed to protect against, how to use it correctly, how to maintain and store it, and the limitations of the PPE. This applies to all categories of PPE, not just complex equipment.",
  },
];

const CscsCardModule2Section2 = () => {
  useSEO({
    title:
      "Personal Protective Equipment | CSCS Card Module 2.2",
    description:
      "Learn about PPE types, selection, fitting, maintenance, and legal requirements under the PPE at Work Regulations 1992 (as amended 2022) for the CSCS HS&E test.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 mb-4">
            <BookOpen className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-block bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-green-400">MODULE 2</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Personal Protective Equipment
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Understanding PPE types, selection, legal duties, and the
            importance of correct use — the last line of defence when other
            controls are not enough
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-green-500/5 border-l-2 border-green-500/50">
            <p className="font-semibold text-green-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">PPE:</strong> equipment that
                  protects the wearer against health and safety risks
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Last resort:</strong> only
                  after elimination, substitution, and engineering controls
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Employer duty:</strong> provide
                  free, suitable PPE and train workers to use it
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Employee duty:</strong> wear it
                  correctly, report defects, store it properly
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-green-500/5 border-l-2 border-green-500/50">
            <p className="font-semibold text-green-400/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Check PPE:</strong> before
                  every use — look for damage, wear, and contamination
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Right PPE:</strong> for the
                  right task — one size does not fit all hazards
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Report defects:</strong> do not
                  use damaged PPE — report and replace immediately
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Face-fit:</strong> tight-fitting
                  RPE must be face-fit tested to each wearer
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4">
            By the end of this section, you will be able to:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Define PPE and explain its position in the hierarchy of controls",
              "State the employer and employee duties under the PPE at Work Regulations 1992 (as amended 2022)",
              "Identify the main types of PPE used on construction sites and their applicable standards",
              "Explain the difference between RPE and PPE and the importance of face-fit testing",
              "Select appropriate PPE for common construction hazards including noise, dust, impact, and chemicals",
              "Describe the requirements for PPE inspection, maintenance, storage, and replacement",
              "Explain the significance of CE and UKCA conformity markings on PPE",
              "Apply hard hat colour coding conventions used on UK construction sites",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is PPE? */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">01</span>
              What Is PPE?
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">
                  Personal Protective Equipment (PPE)
                </strong>{" "}
                is defined under the{" "}
                <strong className="text-white">
                  Personal Protective Equipment at Work Regulations 1992
                </strong>{" "}
                (as amended 2022) as all equipment (including clothing affording
                protection against the weather) which is intended to be worn or
                held by a person at work and which protects the person against
                one or more risks to their health or safety.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  Key Definition: PPE
                </h3>
                <p className="text-white/80 text-sm">
                  PPE is any device or appliance designed to be worn or held by
                  an individual for protection against one or more health and
                  safety hazards. On construction sites, this includes hard hats,
                  safety boots, high-visibility clothing, gloves, eye protection,
                  hearing protection, and respiratory protective equipment (RPE).
                </p>
              </div>

              <p>
                The 2022 amendment extended PPE duties to cover{" "}
                <strong className="text-white">limb (b) workers</strong> —
                workers who are not employees but who work under similar
                arrangements (such as agency workers and casual workers). This
                means more people are now protected by the Regulations.
              </p>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-300">
                    PPE Is the Last Resort
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  PPE should only be used as a{" "}
                  <strong className="text-white">last resort</strong> — when
                  risks cannot be adequately controlled by other means. The
                  hierarchy of controls requires employers to first consider:{" "}
                  <strong className="text-white">elimination</strong> (remove the
                  hazard entirely),{" "}
                  <strong className="text-white">substitution</strong> (replace
                  with something less hazardous),{" "}
                  <strong className="text-white">engineering controls</strong>{" "}
                  (isolate people from the hazard),{" "}
                  <strong className="text-white">
                    administrative controls
                  </strong>{" "}
                  (change the way people work), and only then{" "}
                  <strong className="text-white">PPE</strong> (protect the
                  individual). PPE only protects the person wearing it, and only
                  if it is worn correctly and maintained properly.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  Employer Duties
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Carry out a risk assessment to identify PPE needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Provide suitable PPE free of charge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Ensure PPE is CE/UKCA marked and meets relevant standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Provide information, instruction, and training on correct use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Maintain, clean, and replace PPE as necessary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Ensure PPE is properly stored when not in use</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  Employee Duties
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Wear PPE as instructed and trained</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Return PPE to its designated storage after use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Report any loss, damage, or defect to the employer immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Not misuse or interfere with PPE provided for their safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Take reasonable care of PPE and use it in accordance with training</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Head Protection */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">02</span>
              Head Protection
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Head injuries are one of the most common causes of death and
                serious injury on construction sites. Objects falling from
                height, striking against fixed objects, and contact with
                electrical hazards all pose risks to the head.{" "}
                <strong className="text-white">Hard hats</strong> (industrial
                safety helmets) are the primary form of head protection on
                construction sites.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  EN 397 — Industrial Safety Helmets
                </h3>
                <p className="text-white/80 text-sm">
                  Hard hats used on construction sites must comply with{" "}
                  <strong className="text-white">EN 397</strong>, the European
                  standard for industrial safety helmets. This standard specifies
                  requirements for shock absorption, resistance to penetration,
                  flame resistance, and the performance of the chin strap
                  anchorage points. Optional requirements include resistance to
                  very low temperatures (-20&deg;C or -30&deg;C), resistance to
                  molten metal splash, lateral deformation, and electrical
                  insulation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  Types of Head Protection
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Hard hats (EN 397):</strong>{" "}
                      full-brim or peaked helmets designed to protect against
                      falling objects, impact with fixed objects, and (optionally)
                      electrical contact. Required on most construction sites
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Bump caps:</strong> lightweight
                      caps that protect against bumps and scrapes from fixed objects
                      in confined spaces. They do NOT protect against falling objects
                      and are NOT suitable for construction site use where there is a
                      risk of objects falling from height
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Chin straps:</strong> must be
                      used when there is a risk of the helmet being dislodged — for
                      example, when working at height, in windy conditions, or near
                      rotating machinery
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Hard hats must be inspected before each use. Look for cracks,
                dents, UV degradation (chalky or faded appearance), damaged
                cradles, and frayed or damaged headbands. A hard hat must be{" "}
                <strong className="text-white">
                  replaced immediately after any significant impact
                </strong>
                , even if no visible damage is apparent — the internal structure
                may be compromised. Most manufacturers recommend replacement
                every{" "}
                <strong className="text-white">3 to 5 years</strong>, depending
                on conditions of use.
              </p>

              {/* Hard Hat Colour Coding Diagram */}
              <div className="my-6">
                <h3 className="text-green-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  Hard Hat Colour Coding — Common Site Conventions
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  While there is no single legal standard for hard hat colours,
                  the following colour codes are widely used on UK construction
                  sites to identify roles at a glance:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-white/30 flex items-center justify-center">
                      <HardHat className="h-6 w-6 text-gray-800" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium text-xs">White</p>
                      <p className="text-white/50 text-xs">
                        Site managers, engineers, supervisors
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-yellow-400 border-2 border-yellow-400/30 flex items-center justify-center">
                      <HardHat className="h-6 w-6 text-gray-800" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium text-xs">Yellow</p>
                      <p className="text-white/50 text-xs">
                        General labourers, operatives
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-blue-500/30 flex items-center justify-center">
                      <HardHat className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium text-xs">Blue</p>
                      <p className="text-white/50 text-xs">
                        Skilled workers, electricians, plumbers
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-orange-500 border-2 border-orange-500/30 flex items-center justify-center">
                      <HardHat className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium text-xs">Orange</p>
                      <p className="text-white/50 text-xs">
                        Slingers, signallers, traffic marshals
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-green-500 border-2 border-green-500/30 flex items-center justify-center">
                      <HardHat className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium text-xs">Green</p>
                      <p className="text-white/50 text-xs">
                        Safety officers, environment officers
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-red-500 border-2 border-red-500/30 flex items-center justify-center">
                      <HardHat className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium text-xs">Red</p>
                      <p className="text-white/50 text-xs">
                        Fire marshals, emergency teams
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-600/30 flex items-center justify-center">
                      <HardHat className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium text-xs">Black</p>
                      <p className="text-white/50 text-xs">
                        Senior managers, clients, architects
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-pink-400 border-2 border-pink-400/30 flex items-center justify-center">
                      <HardHat className="h-6 w-6 text-gray-800" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium text-xs">Pink</p>
                      <p className="text-white/50 text-xs">
                        Visitors (some sites)
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-white/40 text-xs mt-3 italic">
                  Note: colour codes vary between contractors and sites. Always
                  check the site-specific rules during induction.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Eye & Face Protection */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">03</span>
              Eye &amp; Face Protection
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Eye injuries on construction sites can result from flying
                particles, dust, chemical splashes, UV radiation, and intense
                light from welding arcs. The correct type of eye or face
                protection must be selected based on the specific hazard.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  EN 166 — Personal Eye Protection
                </h3>
                <p className="text-white/80 text-sm">
                  Eye and face protectors used at work must comply with{" "}
                  <strong className="text-white">EN 166</strong>, the European
                  standard for personal eye protection. The marking on the lens
                  and frame indicates the level of protection:{" "}
                  <strong className="text-white">S</strong> (increased
                  robustness),{" "}
                  <strong className="text-white">F</strong> (low-energy impact),{" "}
                  <strong className="text-white">B</strong> (medium-energy
                  impact), and{" "}
                  <strong className="text-white">A</strong> (high-energy
                  impact). The marking also indicates protection against liquids
                  (3), dust (4), gas (5), and short-circuit electric arc (8).
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  Types of Eye &amp; Face Protection
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Safety spectacles:</strong>{" "}
                      lightweight glasses with side shields. Suitable for
                      low-energy impact hazards such as light grinding, drilling,
                      and general site work. Must have impact-resistant lenses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Safety goggles:</strong>{" "}
                      close-fitting eye protection with a seal around the eyes.
                      Required for protection against chemical splash, dust, and
                      fine particles. Available with direct or indirect
                      ventilation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Face shields/visors:</strong>{" "}
                      protect the entire face from splash, spray, and
                      medium-energy impact. Used for tasks such as cutting,
                      heavy grinding, and working with chemicals. A face shield
                      alone may not provide adequate eye protection — it should
                      often be worn with safety goggles underneath
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Welding filters:</strong>{" "}
                      specialised protection against intense light and UV/IR
                      radiation from welding arcs. Available as fixed shade or
                      auto-darkening filters. The shade number must match the
                      welding process and amperage
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  Selecting Eye Protection by Hazard
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Impact (flying particles):</strong>{" "}
                      safety spectacles (F-rated) or goggles (B-rated) depending
                      on energy level
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Chemical splash:</strong>{" "}
                      chemical-splash goggles (sealed, indirect ventilation) or
                      face shield with goggles
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Dust:</strong>{" "}
                      dust-tight goggles (4-rated) with indirect ventilation
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">UV/welding arc:</strong>{" "}
                      welding filter of appropriate shade number for the process
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Hearing Protection */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">04</span>
              Hearing Protection
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Noise-induced hearing loss is{" "}
                <strong className="text-white">permanent and irreversible</strong>.
                Construction sites are among the noisiest workplaces, with
                activities such as breaking out concrete, angle grinding,
                hammering, and operating heavy plant regularly exceeding safe
                noise levels. The{" "}
                <strong className="text-white">
                  Control of Noise at Work Regulations 2005
                </strong>{" "}
                set out the legal duties for managing noise exposure.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-400">
                  Noise Exposure Action Levels
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-300 text-xs font-bold">L</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        80 dB(A) — Lower Exposure Action Value
                      </p>
                      <p className="text-white/60">
                        Employer must assess risk, provide information and
                        training, and make hearing protection{" "}
                        <strong className="text-white">available</strong> to
                        workers who request it
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-300 text-xs font-bold">U</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        85 dB(A) — Upper Exposure Action Value
                      </p>
                      <p className="text-white/60">
                        Employer must reduce exposure as far as reasonably
                        practicable, designate hearing protection zones, and{" "}
                        <strong className="text-white">ensure</strong> hearing
                        protection is worn
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        87 dB(A) — Exposure Limit Value
                      </p>
                      <p className="text-white/60">
                        Must{" "}
                        <strong className="text-white">never be exceeded</strong>{" "}
                        (taking into account the attenuation provided by hearing
                        protection). If exceeded, the employer must take
                        immediate action to reduce exposure
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  Types of Hearing Protection
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Disposable ear plugs:</strong>{" "}
                      foam plugs that expand to fill the ear canal. Single-use,
                      cost-effective, and widely available. Must be inserted
                      correctly (rolled, inserted, and held until expanded) to be
                      effective. Typical SNR: 25–37 dB
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Reusable ear plugs:</strong>{" "}
                      pre-moulded or custom-moulded plugs that can be washed and
                      reused. More comfortable for extended wear but must be
                      cleaned regularly to prevent ear infections
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Ear defenders (muffs):</strong>{" "}
                      cups that fit over the entire outer ear, held in place by a
                      headband. Easier to fit correctly than ear plugs, readily
                      visible (supervisors can see they are being worn), and
                      available in helmet-mounted versions. Typical SNR: 20–35 dB
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Dual protection:</strong>{" "}
                      combining ear plugs and ear defenders for very high noise
                      environments. Note: dual protection does not double the
                      attenuation — the combined effect is typically the higher
                      SNR plus an additional 5–6 dB
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  SNR Rating
                </h3>
                <p className="text-white/80 text-sm">
                  The <strong className="text-white">Single Number Rating (SNR)</strong>{" "}
                  indicates the overall noise reduction provided by the hearing
                  protector in decibels. To estimate the noise level at the ear,
                  subtract the SNR from the measured noise level. However,
                  real-world protection is typically lower than the laboratory
                  SNR, so the HSE recommends applying a{" "}
                  <strong className="text-white">real-world reduction factor</strong>{" "}
                  of approximately 4 dB less than the SNR for ear defenders and
                  approximately 4 dB less for well-fitted ear plugs. Always
                  select hearing protection that reduces the noise at the ear to
                  below 85 dB(A), ideally to between 70 and 80 dB(A). Over-protection
                  should be avoided as it can isolate the wearer and create
                  different safety risks.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Hand Protection */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">05</span>
              Hand Protection
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Hands are the most commonly injured part of the body on
                construction sites. Cuts, abrasions, punctures, chemical burns,
                and crush injuries account for a significant proportion of all
                reported injuries. Selecting the correct type of glove for the
                task is essential — there is no single glove that protects
                against all hazards.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  EN 388 — Protective Gloves Against Mechanical Risks
                </h3>
                <p className="text-white/80 text-sm">
                  <strong className="text-white">EN 388</strong> is the standard
                  for gloves that protect against mechanical hazards. The marking
                  shows four digits (and optionally a fifth letter) representing
                  performance levels for:{" "}
                  <strong className="text-white">abrasion</strong> (0–4),{" "}
                  <strong className="text-white">blade cut</strong> (0–5),{" "}
                  <strong className="text-white">tear</strong> (0–4), and{" "}
                  <strong className="text-white">puncture</strong> (0–4). The
                  2016 revision added an{" "}
                  <strong className="text-white">ISO cut level</strong> (A–F) and
                  optional <strong className="text-white">impact protection</strong>{" "}
                  (P). Higher numbers and later letters indicate better
                  performance.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  Common Glove Types on Construction Sites
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Rigger gloves:</strong>{" "}
                      heavy-duty leather or synthetic gloves for general handling,
                      lifting, and carrying. Good abrasion resistance but limited
                      cut protection. Commonly used for handling timber, scaffolding
                      tubes, and building materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Nitrile-coated gloves:</strong>{" "}
                      lightweight gloves with a nitrile coating on the palm and
                      fingers. Good grip in wet and oily conditions, good dexterity,
                      and moderate cut resistance. Suitable for handling sheet metal,
                      fixings, and light assembly work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Chemical-resistant gloves:</strong>{" "}
                      made from materials such as nitrile, neoprene, PVC, or butyl
                      rubber to resist permeation by specific chemicals. Must be
                      selected based on the exact chemicals in use — no single
                      material resists all chemicals. Check the safety data sheet
                      (SDS) for the substance being handled
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Cut-resistant gloves:</strong>{" "}
                      reinforced with materials such as HPPE (high-performance
                      polyethylene), Kevlar, or steel fibres. Essential for
                      handling sharp materials such as glass, sheet metal, and
                      cable. Rated under EN 388 cut levels (A to F)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Insulated gloves:</strong>{" "}
                      electrically insulating gloves rated for specific voltage
                      classes (Class 00 to Class 4) under EN 60903. Essential for
                      live electrical work. Must be tested at regular intervals and
                      inspected before every use. Often worn with leather over-gloves
                      for mechanical protection
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-300">
                    When NOT to Wear Gloves
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Gloves must{" "}
                  <strong className="text-white">not</strong> be worn when
                  operating rotating machinery such as pillar drills, bench
                  grinders, and lathes. Loose-fitting gloves can be caught by
                  the rotating parts and drag the hand into the machine, causing
                  severe injury. Always check the risk assessment and machine
                  manufacturer&rsquo;s instructions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Foot Protection */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">06</span>
              Foot Protection
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Safety footwear is mandatory on virtually all construction sites.
                Feet are at risk from falling objects, crushing, puncture from
                sharp objects on the ground (nails, screws, glass), slips, and
                chemical contact.{" "}
                <strong className="text-white">Safety boots</strong> must comply
                with{" "}
                <strong className="text-white">EN ISO 20345</strong>, the
                European standard for safety footwear.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-400">
                  EN ISO 20345 — Safety Ratings Explained
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 text-xs font-bold">S1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        S1 — Basic Safety
                      </p>
                      <p className="text-white/60">
                        Toe protection (200J impact), closed heel, antistatic
                        properties, energy absorption in the heel region, fuel
                        oil resistance. Suitable for indoor environments where
                        the floor is dry
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 text-xs font-bold">S2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        S2 — Water Resistant
                      </p>
                      <p className="text-white/60">
                        All S1 properties plus water penetration and absorption
                        resistance in the upper. Suitable for wet environments
                        without the risk of nail penetration
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 text-xs font-bold">S3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        S3 — Full Construction Site Protection
                      </p>
                      <p className="text-white/60">
                        All S2 properties plus a{" "}
                        <strong className="text-white">
                          penetration-resistant midsole
                        </strong>{" "}
                        and a cleated outsole for improved grip. The most common
                        rating required on UK construction sites
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  Toe Cap Materials
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Steel toe caps:</strong>{" "}
                      traditional, very strong, and cost-effective. Heavier than
                      composite alternatives. Conduct heat and cold, which can be
                      uncomfortable in extreme temperatures. May trigger metal
                      detectors at security-sensitive sites
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Composite toe caps:</strong>{" "}
                      made from materials such as fibreglass, carbon fibre, or
                      Kevlar. Lighter than steel, non-metallic (do not trigger
                      metal detectors), and do not conduct heat or cold.
                      Increasingly popular on modern construction sites. Meet the
                      same 200J impact standard as steel
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Safety boots should be replaced when the sole tread is worn
                smooth (reducing slip resistance), when the toe cap is exposed
                or damaged, when the boot no longer provides adequate ankle
                support, or when the waterproofing has failed. Always lace boots
                fully to provide proper ankle support and prevent the boot from
                coming off during slips or trips.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Respiratory Protection (RPE) */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">07</span>
              Respiratory Protection (RPE)
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">
                  Respiratory Protective Equipment (RPE)
                </strong>{" "}
                is a subset of PPE that specifically protects the wearer&rsquo;s
                lungs from inhaling harmful substances — including dust, fumes,
                vapours, gases, and biological agents. On construction sites,
                RPE is commonly required for tasks involving silica dust, wood
                dust, welding fumes, paint spraying, and asbestos work.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  RPE vs PPE — What Is the Difference?
                </h3>
                <p className="text-white/80 text-sm">
                  All RPE is PPE, but not all PPE is RPE.{" "}
                  <strong className="text-white">RPE</strong> specifically refers
                  to equipment that protects the{" "}
                  <strong className="text-white">respiratory system</strong>{" "}
                  (lungs and airways). RPE has additional legal requirements
                  under the{" "}
                  <strong className="text-white">
                    Control of Substances Hazardous to Health Regulations
                    (COSHH)
                  </strong>{" "}
                  and the{" "}
                  <strong className="text-white">
                    Control of Asbestos Regulations 2012
                  </strong>
                  , including the requirement for{" "}
                  <strong className="text-white">face-fit testing</strong> of
                  tight-fitting facepieces.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  Disposable Filtering Facepieces (FFP Masks)
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        FFP1 — Assigned Protection Factor 4
                      </p>
                      <p className="text-white/60">
                        Filters at least 80% of airborne particles. Suitable for
                        low-toxicity nuisance dusts such as plaster, cement
                        (brief exposure), and general construction dust
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        FFP2 — Assigned Protection Factor 10
                      </p>
                      <p className="text-white/60">
                        Filters at least 94% of airborne particles. Suitable for
                        moderate-toxicity dusts such as wood dust, MDF dust,
                        concrete dust, and moderate welding fumes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        FFP3 — Assigned Protection Factor 20
                      </p>
                      <p className="text-white/60">
                        Filters at least 99% of airborne particles. Required for
                        high-toxicity substances including{" "}
                        <strong className="text-white">asbestos fibres</strong>,
                        silica dust (high exposure), lead dust, and hardwood dust
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  Reusable Respirators
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Half-face respirators:</strong>{" "}
                      cover the nose and mouth. Use replaceable filter cartridges
                      for particles, gases, or combined hazards. More
                      cost-effective than disposable masks for regular use.
                      Assigned Protection Factor up to 10 (particle filters) or
                      10 (gas/vapour filters)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Full-face respirators:</strong>{" "}
                      cover the entire face, providing eye protection as well as
                      respiratory protection. Higher Assigned Protection Factor
                      (up to 20 for particle filters, 20 for gas/vapour). Used
                      for higher-risk exposures and where eye protection is also
                      needed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Powered air-purifying respirators (PAPR):</strong>{" "}
                      battery-powered units that draw air through a filter and
                      deliver it to a hood, helmet, or visor. Do not require a
                      tight face seal, making them suitable for workers with
                      facial hair or who cannot achieve a satisfactory face fit.
                      Higher protection factors available
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-300">
                    Face-Fit Testing — A Legal Requirement
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  Any{" "}
                  <strong className="text-white">tight-fitting RPE</strong>{" "}
                  (disposable masks, half-face and full-face respirators) must be{" "}
                  <strong className="text-white">
                    face-fit tested to the individual wearer
                  </strong>
                  . A face-fit test checks that the facepiece makes an adequate
                  seal against the wearer&rsquo;s face. Without a proper seal,
                  contaminated air leaks in around the edges and the stated
                  protection factor is not achieved.
                </p>
                <ul className="text-white/70 space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Qualitative test:</strong>{" "}
                      uses a bitter or sweet aerosol to check for leakage — if
                      the wearer can taste the aerosol, the fit is inadequate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Quantitative test:</strong>{" "}
                      uses a particle counter to measure the ratio of particles
                      inside and outside the facepiece, giving a numerical fit
                      factor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Under the{" "}
                      <strong className="text-white">
                        Control of Asbestos Regulations 2012
                      </strong>
                      , face-fit testing is{" "}
                      <strong className="text-white">mandatory</strong> for all
                      tight-fitting RPE used during asbestos work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Facial hair (bears, stubble) prevents a proper seal —
                      workers with facial hair must use{" "}
                      <strong className="text-white">
                        loose-fitting RPE
                      </strong>{" "}
                      (such as powered hoods) instead
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: High-Visibility Clothing & Other PPE */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">08</span>
              High-Visibility Clothing &amp; Other PPE
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">
                  High-visibility (hi-vis) clothing
                </strong>{" "}
                is one of the most widely required forms of PPE on construction
                sites. It makes the wearer conspicuous to vehicle and plant
                operators, reducing the risk of being struck. Hi-vis clothing
                must comply with{" "}
                <strong className="text-white">EN ISO 20471</strong>.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-400">
                  EN ISO 20471 — Hi-Vis Classes
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Class 1 — Minimum Visibility
                      </p>
                      <p className="text-white/60">
                        Smallest area of fluorescent and retroreflective material
                        (e.g., armbands, belts). Generally{" "}
                        <strong className="text-white">
                          NOT sufficient for construction sites
                        </strong>
                        . May be used in low-risk environments away from vehicles
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Class 2 — Standard Visibility
                      </p>
                      <p className="text-white/60">
                        Moderate area of fluorescent and retroreflective material
                        (e.g., vests, waistcoats). The minimum standard required
                        on most construction sites for pedestrian workers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Class 3 — Maximum Visibility
                      </p>
                      <p className="text-white/60">
                        Greatest area of fluorescent and retroreflective material
                        (e.g., full jackets, coveralls, trousers with hi-vis
                        banding). Required where workers are close to moving
                        vehicles, on highways, or in poor visibility conditions
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  Other PPE on Construction Sites
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Fall protection harnesses:</strong>{" "}
                      full-body harnesses with lanyards and energy absorbers used
                      when working at height where collective protection (guard
                      rails, safety nets) is not practicable. Must be inspected
                      every 6 months by a competent person and replaced after any
                      fall arrest event
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Knee pads:</strong>{" "}
                      protect the knees from prolonged kneeling on hard surfaces.
                      Essential for trades that involve floor-level work such as
                      tiling, cable routing, and under-floor installations. Help
                      prevent bursitis (swollen knee joints)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Weather protection:</strong>{" "}
                      waterproof jackets, thermal layers, and sun protection
                      (hats, sunscreen) for outdoor work. The PPE at Work
                      Regulations include clothing that protects against the
                      weather where it presents a health risk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Skin protection:</strong>{" "}
                      barrier creams, sun cream (SPF 30+), and after-work
                      moisturisers to protect against dermatitis and skin cancer
                      — particularly for outdoor workers exposed to UV
                    </span>
                  </li>
                </ul>
              </div>

              {/* PPE Selection Guide Diagram */}
              <div className="my-6">
                <h3 className="text-green-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  PPE Selection Guide — Hazard to PPE
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Use this quick-reference guide to identify the correct PPE for
                  common construction hazards:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-green-400/20 rounded-lg p-3">
                    <p className="text-green-400 font-medium text-sm mb-2">
                      Falling Objects
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-8 bg-green-400/40"></div>
                      <div className="text-white/70 text-xs space-y-1">
                        <p>Hard hat (EN 397)</p>
                        <p>Safety boots with toe cap (EN ISO 20345 S3)</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 rounded-lg p-3">
                    <p className="text-green-400 font-medium text-sm mb-2">
                      Noise (&gt;80 dB)
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-8 bg-green-400/40"></div>
                      <div className="text-white/70 text-xs space-y-1">
                        <p>Ear plugs (SNR-rated) or ear defenders</p>
                        <p>Dual protection above 100 dB</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 rounded-lg p-3">
                    <p className="text-green-400 font-medium text-sm mb-2">
                      Dust / Fumes
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-8 bg-green-400/40"></div>
                      <div className="text-white/70 text-xs space-y-1">
                        <p>FFP2 mask (general dust) or FFP3 (toxic dust/asbestos)</p>
                        <p>Half/full-face respirator for prolonged exposure</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 rounded-lg p-3">
                    <p className="text-green-400 font-medium text-sm mb-2">
                      Chemical Splash
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-8 bg-green-400/40"></div>
                      <div className="text-white/70 text-xs space-y-1">
                        <p>Chemical-splash goggles + face shield</p>
                        <p>Chemical-resistant gloves (check SDS)</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 rounded-lg p-3">
                    <p className="text-green-400 font-medium text-sm mb-2">
                      Sharp Materials / Cuts
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-8 bg-green-400/40"></div>
                      <div className="text-white/70 text-xs space-y-1">
                        <p>Cut-resistant gloves (EN 388, level C–F)</p>
                        <p>Arm protection for sheet metal handling</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 rounded-lg p-3">
                    <p className="text-green-400 font-medium text-sm mb-2">
                      Working at Height
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-8 bg-green-400/40"></div>
                      <div className="text-white/70 text-xs space-y-1">
                        <p>Full-body harness + energy-absorbing lanyard</p>
                        <p>Hard hat with chin strap</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 rounded-lg p-3">
                    <p className="text-green-400 font-medium text-sm mb-2">
                      Moving Vehicles / Plant
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-8 bg-green-400/40"></div>
                      <div className="text-white/70 text-xs space-y-1">
                        <p>Hi-vis Class 2 (min) or Class 3 clothing</p>
                        <p>Safety boots with ankle support</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 rounded-lg p-3">
                    <p className="text-green-400 font-medium text-sm mb-2">
                      Nail / Puncture Risk
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-8 bg-green-400/40"></div>
                      <div className="text-white/70 text-xs space-y-1">
                        <p>S3 boots (penetration-resistant midsole)</p>
                        <p>Puncture-resistant gloves (EN 388)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  PPE Maintenance, Storage &amp; Training
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Maintenance:</strong>{" "}
                      employers must ensure PPE is maintained in good working
                      order. This includes cleaning, inspection, repair, and
                      replacement of worn or damaged items. Manufacturer&rsquo;s
                      maintenance instructions must be followed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Storage:</strong>{" "}
                      PPE must be stored in a clean, dry, designated area when
                      not in use. It must not be left on the ground, exposed to
                      sunlight (which degrades plastics), or stored near
                      chemicals that could contaminate or damage it. Individual
                      storage lockers or bags should be provided
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Training:</strong>{" "}
                      the employer must provide information, instruction, and
                      training on why the PPE is needed, how to use it correctly,
                      how to check it before use, how to maintain and store it,
                      and its limitations. Training should be refreshed when new
                      PPE is introduced or when there are changes to risk
                      assessments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Record keeping:</strong>{" "}
                      employers should keep records of PPE issued, face-fit test
                      results, training provided, and inspection and maintenance
                      schedules. This provides evidence of compliance and helps
                      track replacement needs
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  CE &amp; UKCA Marking
                </h3>
                <p className="text-white/80 text-sm">
                  All PPE sold and used in the UK must carry a valid conformity
                  mark.{" "}
                  <strong className="text-white">CE marking</strong> (Conformit&eacute;
                  Europ&eacute;enne) confirms compliance with European PPE
                  Regulation (EU) 2016/425.{" "}
                  <strong className="text-white">UKCA marking</strong> (UK
                  Conformity Assessed) confirms compliance with the equivalent
                  UK regulations. During the transition period, both marks are
                  accepted in Great Britain. Always check that PPE carries the
                  correct mark and that it is genuine — counterfeit PPE is a
                  serious and growing problem. Look for the mark on the product
                  itself (not just the packaging), along with the relevant
                  standard number, the manufacturer&rsquo;s name, and the notified
                  body number (for Category III PPE).
                </p>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-300">
                    PPE Categories Under EU/UK Regulations
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-white/70">
                  <p>
                    PPE is classified into three categories based on risk:
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Category I (Simple):</strong>{" "}
                        protects against minimal risks — e.g., gardening gloves,
                        sunglasses. Self-certification by the manufacturer
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Category II (Intermediate):</strong>{" "}
                        protects against medium risks — e.g., safety glasses,
                        hi-vis clothing, safety boots. Requires EU/UK type
                        examination by a notified body
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Category III (Complex):</strong>{" "}
                        protects against fatal or irreversible risks — e.g., RPE,
                        fall protection harnesses, chemical suits. Requires
                        EU/UK type examination PLUS ongoing conformity
                        assessment (annual audit or product testing)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz
            title="Section 2 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-2-section-3">
              Next: Workplace Welfare &amp; Site Safety
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default CscsCardModule2Section2;
