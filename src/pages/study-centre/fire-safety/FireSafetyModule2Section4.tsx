import {
  ArrowLeft,
  ArrowRight,
  Scale,
  ShieldCheck,
  Building2,
  Radio,
  Lightbulb,
  Blocks,
  HardHat,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "approved-doc-b-parts",
    question: "What are the five parts of Approved Document B?",
    options: [
      "B1 Means of warning and escape, B2 Internal fire spread (linings), B3 Internal fire spread (structure), B4 External fire spread, B5 Access and facilities for the fire service",
      "B1 Fire detection, B2 Compartmentation, B3 Structural fire resistance, B4 Sprinkler systems, B5 Fire brigade access",
      "B1 Smoke control, B2 Flame spread, B3 Structural collapse, B4 Cladding, B5 Hydrant provision",
      "B1 Escape routes, B2 Fire doors, B3 Fire walls, B4 Roof coverings, B5 Emergency lighting",
    ],
    correctIndex: 0,
    explanation:
      "Approved Document B is divided into five sections: B1 covers means of warning and escape; B2 addresses internal fire spread relating to linings; B3 deals with internal fire spread relating to structure (compartmentation, fire resistance); B4 covers external fire spread (roofs and walls); and B5 addresses access and facilities for the fire service. Electricians must understand these as their installations interact with every one of these requirements.",
  },
  {
    id: "bs5839-category-l1",
    question: "What does BS 5839 Part 1 Category L1 mean?",
    options: [
      "A manual-only system with call points at exits",
      "A property protection system covering high-value areas only",
      "Full life safety coverage — detectors throughout all areas of the building",
      "A domestic smoke alarm system to BS 5839 Part 6",
    ],
    correctIndex: 2,
    explanation:
      "Category L1 is the highest level of life safety protection under BS 5839-1. It requires automatic fire detectors to be installed throughout all areas of the building, including roof voids and floor voids (with some limited exceptions). The aim is to provide the earliest possible warning of fire to protect life, regardless of where in the building the fire starts. Category L1 is typically specified for sleeping accommodation, care homes, and buildings where early detection is critical.",
  },
  {
    id: "cdm-construction-fire",
    question:
      "Which legislation specifically covers fire safety during construction work?",
    options: [
      "The Regulatory Reform (Fire Safety) Order 2005",
      "The Health and Safety at Work Act 1974 only",
      "The Construction (Design and Management) Regulations 2015 (CDM 2015)",
      "BS 9999: Fire Safety in Building Design",
    ],
    correctIndex: 2,
    explanation:
      "During the construction phase, fire safety is primarily managed under CDM 2015 — not the RRFSO. The RRFSO applies to completed or occupied premises, not to construction sites. CDM 2015 places duties on the principal contractor to prepare a fire safety plan, provide temporary fire detection, manage hot works, and ensure adequate means of escape for all workers on site. The Joint Codes of Practice on Fire Prevention in Construction (including FPA RC 35/59) provide detailed guidance.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between BS 5839 Category L and Category P systems?",
    answer:
      "Category L systems (L1 to L5) are designed for life safety — their primary purpose is to give occupants the earliest possible warning of fire so they can escape safely. Category L1 provides detectors throughout all areas; L2 covers defined areas of high fire risk plus escape routes; L3 covers escape routes only; L4 covers specific areas within escape routes; and L5 is a bespoke category for any other specific life safety objective. Category P systems (P1 and P2) are designed for property protection — their primary purpose is to detect fire and raise the alarm to minimise damage to the building and its contents. P1 provides detectors throughout all areas for maximum property protection; P2 covers only defined high-risk areas. A building can have both L and P coverage — for example, L2 for life safety in escape routes and P2 for property protection in server rooms. The distinction matters because the fire risk assessment (required by the RRFSO) determines which category is appropriate.",
  },
  {
    question:
      "As an electrician, which fire safety standards am I most likely to work with?",
    answer:
      "The fire safety standards most relevant to electricians are BS 5839 (fire detection and fire alarm systems — both Part 1 for non-domestic and Part 6 for domestic), BS 5266-1 (emergency lighting), and the fire-related requirements within BS 7671 (the IET Wiring Regulations). You will also need to understand Approved Document B (Building Regulations Part B) and its requirements for compartmentation, fire stopping, and cable penetration seals — because every cable you route through a fire-resistant wall, floor, or ceiling must be properly fire stopped to maintain the integrity of the fire compartment. Additionally, BS 7346 covers components for smoke and heat control systems that electricians may install. In practice, most electrical contractors working on commercial, industrial, or public buildings will encounter these standards on a regular basis.",
  },
  {
    question:
      "What is fire stopping and why is it critical for electrical installations?",
    answer:
      "Fire stopping is the process of sealing openings and joints in fire-resistant elements (walls, floors, ceilings, and cavity barriers) to restore their fire resistance after penetrations have been made — for example, where cables, conduit, trunking, or containment systems pass through a fire compartment boundary. It is critical for electrical installations because electricians routinely create penetrations through fire-rated structures to route cables and containment. If these penetrations are not properly sealed with tested and approved fire stopping products (intumescent sealants, fire pillows, fire collars, fire batts, or proprietary cable transit systems), fire and smoke can spread rapidly from one compartment to another, defeating the purpose of the building's fire strategy. Under Approved Document B and the RRFSO, it is a legal requirement that fire compartment integrity is maintained. Many fire investigation reports cite failed or missing fire stopping around electrical penetrations as a major factor in the spread of fire. Electricians have a direct responsibility to ensure that any penetrations they create are properly fire stopped — either by carrying out the fire stopping themselves (if competent and using approved products to tested details) or by ensuring that a specialist fire stopping contractor reinstates the fire barrier.",
  },
  {
    question: "Does BS 9999 replace Approved Document B?",
    answer:
      "No. BS 9999 does not replace Approved Document B — it provides an alternative approach to achieving compliance with the fire safety requirements of the Building Regulations. Approved Document B is the government-published guidance that is deemed to satisfy the requirements of Part B of the Building Regulations. If you follow Approved Document B, you have a presumption of compliance. BS 9999 offers a more flexible, risk-based approach that allows designers to justify alternative solutions based on a detailed analysis of risk profiles and occupancy characteristics. It is particularly useful for complex, innovative, or unusual building designs where the prescriptive guidance in Approved Document B may not be appropriate or may be overly conservative. Both routes are acceptable to building control bodies, but if BS 9999 is used, the designer must demonstrate that the overall level of fire safety is at least equivalent to that achieved by following Approved Document B. In practice, most standard electrical installations will be designed to Approved Document B, but electricians working on large or complex projects may encounter specifications based on BS 9999.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under the Health and Safety at Work Act 1974, which sections impose general duties on employers towards employees and non-employees?",
    options: [
      "Sections 1 and 2 only",
      "Sections 2 (employees) and 3 (non-employees)",
      "Sections 7 and 8 only",
      "Sections 10 and 11 only",
    ],
    correctAnswer: 1,
    explanation:
      "Section 2 of HASAWA 1974 imposes a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all their employees. Section 3 extends this duty to non-employees — members of the public, visitors, contractors, and anyone else who may be affected by the employer's undertaking. Together, these sections establish the overarching duty of care framework within which all more specific fire safety legislation (including the RRFSO) operates.",
  },
  {
    id: 2,
    question:
      "Under the Management of Health and Safety at Work Regulations 1999, which regulation requires the employer to appoint one or more competent persons to assist with health and safety compliance?",
    options: [
      "Regulation 3 — Risk Assessment",
      "Regulation 7 — Health and Safety Assistance (Competent Persons)",
      "Regulation 10 — Information for Employees",
      "Regulation 13 — Capabilities and Training",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 7 of the Management Regulations 1999 requires every employer to appoint one or more competent persons to assist them in complying with their health and safety duties. A competent person must have sufficient training, experience, knowledge, and other qualities to properly carry out the functions assigned to them. In a fire safety context, this might be a fire safety manager, a fire risk assessor, or an external fire safety consultant — depending on the complexity of the premises and the employer's own in-house competence.",
  },
  {
    id: 3,
    question:
      "Which part of Approved Document B specifically addresses compartmentation, fire resistance of structure, and fire stopping?",
    options: [
      "B1 — Means of warning and escape",
      "B2 — Internal fire spread (linings)",
      "B3 — Internal fire spread (structure)",
      "B4 — External fire spread",
    ],
    correctAnswer: 2,
    explanation:
      "Section B3 of Approved Document B deals with internal fire spread relating to structure. This includes compartmentation (dividing buildings into fire compartments to contain fire spread), the fire resistance of structural elements (walls, floors, beams, columns), and fire stopping of penetrations through fire-separating elements. B3 is particularly important for electricians because every cable penetration through a compartment wall or floor must be properly fire stopped to maintain the required fire resistance period.",
  },
  {
    id: 4,
    question:
      "In BS 5839-1, what is the key difference between Category L3 and Category L2 fire detection systems?",
    options: [
      "L3 requires detectors throughout all areas; L2 covers only escape routes",
      "L3 covers escape routes only; L2 covers escape routes plus defined high-risk areas",
      "L3 is for domestic premises; L2 is for commercial buildings",
      "L3 is a manual system; L2 is fully automatic",
    ],
    correctAnswer: 1,
    explanation:
      "Category L3 provides automatic fire detection on escape routes only — corridors, stairways, and circulation areas — to give early warning when fire threatens the means of escape. Category L2 extends this to include automatic detection in defined rooms or areas that present a high fire risk (such as kitchens, plant rooms, or storage areas) in addition to the escape routes. L2 therefore provides broader coverage than L3 and is specified where specific high-risk areas need protection beyond the escape routes alone. The fire risk assessment determines which category is appropriate for the building.",
  },
  {
    id: 5,
    question:
      "Under BS 5266-1, what is the minimum required duration for emergency escape lighting in most premises?",
    options: [
      "30 minutes",
      "1 hour",
      "2 hours",
      "3 hours",
    ],
    correctAnswer: 1,
    explanation:
      "BS 5266-1 requires emergency escape lighting to operate for a minimum of 1 hour in most premises. However, for sleeping accommodation (hotels, hostels, hospitals, care homes) or premises where re-occupation is not immediate (the building cannot be simply evacuated and left), a minimum duration of 3 hours is required. The 1-hour minimum assumes that the building will be fully evacuated and not re-entered until the normal lighting supply is restored. Monthly functional tests and annual full-duration tests are required to verify that the batteries and luminaires can sustain the required duration.",
  },
  {
    id: 6,
    question:
      "What is the primary advantage of BS 9999 over Approved Document B for fire safety design?",
    options: [
      "BS 9999 is legally mandatory whereas Approved Document B is only guidance",
      "BS 9999 provides a more flexible, risk-based approach that allows alternative solutions for complex building designs",
      "BS 9999 is free to download whereas Approved Document B must be purchased",
      "BS 9999 only applies to residential buildings whereas Approved Document B applies to all building types",
    ],
    correctAnswer: 1,
    explanation:
      "BS 9999 provides a more flexible, risk-based approach to fire safety design compared to the more prescriptive guidance in Approved Document B. It allows designers to justify alternative solutions based on a detailed analysis of risk profiles and occupancy characteristics, making it particularly useful for complex, innovative, or unusual building designs. Neither document is legally mandatory in itself — both are routes to demonstrating compliance with the functional requirements of Part B of the Building Regulations. The key advantage of BS 9999 is flexibility with justification, rather than strict adherence to prescriptive rules.",
  },
  {
    id: 7,
    question:
      "Under CDM 2015, who has primary responsibility for fire safety on a construction site?",
    options: [
      "The building owner or occupier under the RRFSO",
      "The local fire and rescue authority",
      "The principal contractor",
      "The architect or principal designer",
    ],
    correctAnswer: 2,
    explanation:
      "Under CDM 2015, the principal contractor has primary responsibility for managing fire safety during the construction phase. This includes preparing a fire safety plan for the site, providing temporary fire detection and alarm systems, managing hot works through a permit system, ensuring adequate means of escape for all workers, providing fire-fighting equipment, and conducting fire drills. The RRFSO does not apply to construction sites in the same way as completed buildings — CDM 2015 is the controlling legislation during the construction phase.",
  },
  {
    id: 8,
    question:
      "Why is fire stopping around electrical cable penetrations through compartment walls and floors so critical?",
    options: [
      "It prevents water ingress into cable routes during fire-fighting operations",
      "It ensures the electrical cables are protected from mechanical damage",
      "It maintains the fire resistance of the compartment boundary, preventing fire and smoke spread between compartments",
      "It reduces the electrical resistance of the cable installation",
    ],
    correctAnswer: 2,
    explanation:
      "Fire stopping around cable penetrations maintains the fire resistance of the compartment boundary. When cables pass through a fire-rated wall or floor, they create an opening that, if left unsealed, allows fire, smoke, and hot gases to spread from one compartment to another — defeating the building's fire strategy. Approved Document B (section B3) requires that all penetrations through fire-separating elements are sealed to maintain the required period of fire resistance (typically 30, 60, 90, or 120 minutes). Electricians have a direct responsibility to ensure that penetrations they create are properly fire stopped using tested and approved products installed in accordance with the manufacturer's tested details.",
  },
];

export default function FireSafetyModule2Section4() {
  useSEO({
    title:
      "Supporting Legislation & Standards | Fire Safety Module 2.4",
    description:
      "Supporting fire safety legislation and standards — HASAWA 1974, Management Regulations 1999, Building Regulations Part B, BS 5839, BS 5266, BS 9999, CDM 2015 — for electricians and fire marshals.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Scale className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-500 text-xs font-semibold">
              MODULE 2 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Supporting Legislation &amp; Standards
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The wider legislative and standards framework that supports the
            RRFSO &mdash; from the Health and Safety at Work Act and Management
            Regulations to Building Regulations Part B, British Standards for
            fire detection, emergency lighting, and fire safety design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>HASAWA 1974:</strong> Overarching duty of care for all
                workplace safety
              </li>
              <li>
                <strong>Management Regs 1999:</strong> Risk assessment,
                competent persons, emergency procedures
              </li>
              <li>
                <strong>Building Regs Part B:</strong> Fire safety in building
                design and construction
              </li>
              <li>
                <strong>BS 5839 / BS 5266:</strong> Fire detection and emergency
                lighting standards
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">
              For Electricians
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Fire stopping:</strong> Every cable penetration through a
                fire barrier must be sealed
              </li>
              <li>
                <strong>BS 5839:</strong> You install and maintain these systems
              </li>
              <li>
                <strong>BS 5266:</strong> Emergency lighting is your
                responsibility
              </li>
              <li>
                <strong>CDM 2015:</strong> Fire safety during construction is
                separate from RRFSO
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain how the Health and Safety at Work Act 1974 relates to fire safety and the RRFSO",
              "Describe the key fire-relevant duties under the Management of Health and Safety at Work Regulations 1999",
              "List the five sections of Approved Document B and explain their relevance to electrical installations",
              "Distinguish between BS 5839 system categories (L1-L5, P1-P2, M) and describe system types",
              "Outline the requirements of BS 5266-1 for emergency escape lighting including test regimes",
              "Explain the role of BS 9999 as an alternative to Approved Document B",
              "Describe fire safety responsibilities under CDM 2015 during the construction phase",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Health and Safety at Work Act 1974 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Health and Safety at Work Act 1974
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Health and Safety at Work etc. Act 1974</strong>{" "}
                (HASAWA) is the{" "}
                <strong>overarching health and safety legislation</strong> in
                Great Britain. It establishes the general duty of care that
                employers owe to their employees and to others who may be
                affected by their work activities. While the Regulatory Reform
                (Fire Safety) Order 2005 is the primary fire-specific
                legislation, it sits within the broader framework created by
                HASAWA.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Sections of HASAWA (Sections 2&ndash;9)
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      S2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Duties of employers to employees
                      </p>
                      <p>
                        General duty to ensure, so far as is reasonably
                        practicable, the health, safety, and welfare at work of
                        all employees. Includes safe systems of work, safe
                        premises, adequate training, and a written safety policy
                        (for employers with 5+ employees).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      S3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Duties to non-employees
                      </p>
                      <p>
                        Duty to conduct the undertaking so that persons not in
                        employment (visitors, members of the public, contractors)
                        are not exposed to risks to their health or safety.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      S4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Duties of persons in control of premises
                      </p>
                      <p>
                        Those who have control of premises (to any extent) must
                        ensure the premises, and means of access/egress, are safe
                        and without risks to health. This is directly relevant to
                        fire safety in shared or multi-occupied buildings.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      S7
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Duties of employees
                      </p>
                      <p>
                        Every employee must take reasonable care for their own
                        health and safety and that of others who may be affected
                        by their acts or omissions. Employees must also
                        cooperate with their employer on health and safety
                        matters &mdash; including fire safety procedures.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      S8
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Duty not to interfere or misuse
                      </p>
                      <p>
                        No person shall intentionally or recklessly interfere
                        with or misuse anything provided in the interests of
                        health, safety, or welfare. This includes fire
                        extinguishers, fire doors, fire alarm systems, and
                        emergency lighting.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      S9
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        No charging for safety provisions
                      </p>
                      <p>
                        Employers cannot charge employees for anything done or
                        provided to comply with health and safety requirements.
                        Fire safety training, PPE, and equipment must be
                        provided free of charge.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The RRFSO sits alongside HASAWA. The{" "}
                <strong>Health and Safety Executive (HSE)</strong> enforces
                general workplace health and safety under HASAWA, while the{" "}
                <strong>local fire and rescue authority</strong> enforces fire
                safety under the RRFSO. There is an overlap and interface
                between the two regimes &mdash; for example, where a fire risk
                also constitutes a workplace health and safety risk (such as
                flammable substances or electrical hazards), both the HSE and
                the fire authority may have jurisdiction. In practice, a
                memorandum of understanding between the HSE and fire authorities
                defines how they coordinate their enforcement activities.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Key Point
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    HASAWA provides the general duty of care; the RRFSO provides
                    the specific fire safety duties.
                  </strong>{" "}
                  An employer who complies with the RRFSO but ignores wider
                  workplace safety risks (or vice versa) is not meeting their
                  legal obligations. Both regimes apply simultaneously, and
                  non-compliance with either can result in enforcement action,
                  improvement notices, prohibition notices, or criminal
                  prosecution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Management of Health and Safety at Work Regulations 1999 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Management of Health and Safety at Work Regulations 1999
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The{" "}
                <strong>
                  Management of Health and Safety at Work Regulations 1999
                </strong>{" "}
                (often called &ldquo;the Management Regulations&rdquo;) expand
                upon the general duties of HASAWA with more specific
                requirements for how employers must manage health and safety.
                Several of these regulations directly complement and support the
                fire-specific duties under the RRFSO.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Regulations and Their Fire Safety Relevance
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[40px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      Reg 3
                    </span>
                    <div>
                      <p className="text-white font-medium">Risk Assessment</p>
                      <p>
                        Every employer must carry out a suitable and sufficient
                        assessment of the risks to the health and safety of
                        employees and anyone else affected by their undertaking.
                        The RRFSO requires a specific fire risk assessment
                        &mdash; but Regulation 3 ensures that fire risks are
                        also considered as part of the general workplace risk
                        assessment. This avoids gaps where fire risks might
                        interact with other workplace hazards (e.g., flammable
                        chemicals, electrical systems, or hot work processes).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[40px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      Reg 7
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Competent Persons
                      </p>
                      <p>
                        Employers must appoint one or more competent persons to
                        assist them in complying with their health and safety
                        duties. In a fire safety context, this may be a fire
                        safety manager, a fire risk assessor, or a qualified
                        fire safety consultant. The RRFSO also requires the
                        responsible person to appoint competent persons
                        specifically for fire safety &mdash; Regulation 7
                        ensures that fire competence is part of the wider
                        competency framework.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[40px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      Reg 8
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Emergency Procedures
                      </p>
                      <p>
                        Employers must establish and, where necessary, implement
                        appropriate procedures to be followed in the event of
                        serious and imminent danger. This aligns directly with
                        the RRFSO&rsquo;s requirement for emergency plans and
                        fire evacuation procedures. Regulation 8 also requires
                        the appointment of sufficient competent persons to
                        implement the emergency procedures &mdash; such as fire
                        marshals, fire wardens, and emergency coordinators.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[40px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      Reg 10
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Information for Employees
                      </p>
                      <p>
                        Employers must provide employees with comprehensible and
                        relevant information on health and safety risks and the
                        measures in place to control them. This includes fire
                        risks, fire safety procedures, the location of fire
                        exits and assembly points, and the action to take in the
                        event of fire.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[40px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      Reg 11
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Cooperation and Coordination
                      </p>
                      <p>
                        Where two or more employers share a workplace, they must
                        cooperate and coordinate their health and safety
                        arrangements. This is critical for fire safety in
                        multi-occupied buildings &mdash; for example, shared
                        escape routes, common fire alarm systems, and
                        coordinated evacuation procedures. The RRFSO places
                        similar duties on responsible persons in shared premises.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[40px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      Reg 13
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Capabilities and Training
                      </p>
                      <p>
                        Employers must ensure that employees are provided with
                        adequate health and safety training &mdash; on
                        recruitment, on transfer, on the introduction of new
                        work equipment or processes, and when exposed to new
                        risks. Fire safety training (fire awareness, use of
                        extinguishers, evacuation procedures, fire marshal
                        duties) falls squarely within this requirement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Avoiding Duplication:</strong>{" "}
                  The Management Regulations and the RRFSO overlap in several
                  areas &mdash; risk assessment, competent persons, emergency
                  procedures, information, and training. In practice, employers
                  should integrate their fire risk assessment with their general
                  workplace risk assessment and ensure that fire safety
                  competence, procedures, and training are part of the overall
                  health and safety management system. There is no need to
                  duplicate effort, but there is a need to ensure that fire
                  safety is not overlooked within the general system, and that
                  general health and safety risks are not overlooked within the
                  fire-specific system.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Building Regulations Part B (Fire Safety) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Building Regulations Part B (Fire Safety)
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The{" "}
                <strong>Building Regulations 2010</strong>, specifically{" "}
                <strong>Part B (Fire Safety)</strong>, set out the requirements
                for fire safety in the design and construction of buildings.
                The accompanying{" "}
                <strong>Approved Document B</strong> provides detailed guidance
                on how to comply with these requirements. It is published in two
                volumes: <strong>Volume 1</strong> covers dwellings and{" "}
                <strong>Volume 2</strong> covers buildings other than dwellings.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Five Sections of Approved Document B
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      B1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Means of Warning and Escape
                      </p>
                      <p>
                        Requirements for fire detection and fire alarm systems
                        to provide adequate warning, and for the design and
                        provision of escape routes to allow occupants to reach a
                        place of safety. Includes travel distances, number and
                        width of escape routes, protection of escape routes,
                        emergency lighting, and exit signage. Electricians
                        install the fire alarm and emergency lighting systems
                        that form the backbone of B1 compliance.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      B2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Internal Fire Spread (Linings)
                      </p>
                      <p>
                        Requirements for the surface materials used on walls and
                        ceilings to limit the rate of fire growth and the rate
                        of heat release. This controls how quickly fire can
                        spread across the internal surfaces of a room. Materials
                        are classified by their reaction to fire (Euroclass
                        system: A1, A2, B, C, D, E, F). Cable management
                        systems and containment mounted on or within linings
                        must not compromise the fire performance of those
                        linings.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      B3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Internal Fire Spread (Structure)
                      </p>
                      <p>
                        Requirements for the fire resistance of the building
                        structure and for compartmentation &mdash; dividing
                        buildings into fire compartments to limit the spread of
                        fire. This section covers fire-resisting walls and
                        floors, compartment sizes, fire stopping of
                        penetrations, and cavity barriers.{" "}
                        <strong>
                          This is the most critical section for electricians
                        </strong>{" "}
                        &mdash; every cable, conduit, trunking, or containment
                        system that penetrates a compartment wall or floor must
                        be properly fire stopped to maintain the required fire
                        resistance period.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      B4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        External Fire Spread
                      </p>
                      <p>
                        Requirements for the external walls and roofs of
                        buildings to resist the spread of fire over the external
                        surfaces and from one building to another. This includes
                        restrictions on the use of combustible materials in
                        external wall systems (significantly tightened following
                        the Grenfell Tower fire), unprotected areas in external
                        walls, and the fire resistance of roof coverings.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      B5
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Access and Facilities for the Fire Service
                      </p>
                      <p>
                        Requirements for the provision of access for fire
                        appliances and firefighters, fire mains (dry risers and
                        wet risers), firefighting shafts and lobbies, and
                        facilities within buildings to assist firefighting
                        operations. Electricians may be involved in installing
                        fire-fighting lifts, firefighter communication systems,
                        and the electrical supplies to fire mains pumps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Fire Stopping, Compartmentation &amp; Cavity Barriers
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    These are critical for electrical installations.
                  </strong>{" "}
                  Every time an electrician routes cables through a fire-rated
                  wall, floor, or ceiling, they create a penetration that must
                  be sealed with tested and approved fire stopping products.
                  Cavity barriers must be reinstated wherever cable routes pass
                  through concealed spaces. Failure to fire stop correctly is
                  one of the most common defects found in fire safety
                  inspections and has been identified as a contributing factor
                  in numerous fire fatalities. If you create a penetration, you
                  are responsible for ensuring it is properly fire stopped
                  &mdash; or for ensuring a specialist contractor reinstates the
                  fire barrier.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: BS 5839: Fire Detection and Fire Alarm Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            BS 5839: Fire Detection and Fire Alarm Systems
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>BS 5839</strong> is the primary British Standard for
                fire detection and fire alarm systems. It is divided into
                several parts, with{" "}
                <strong>Part 1</strong> providing the code of practice for the
                design, installation, commissioning, and maintenance of systems
                in <strong>non-domestic premises</strong>, and{" "}
                <strong>Part 6</strong> covering{" "}
                <strong>domestic premises</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  BS 5839-1 System Categories
                </p>
                <div className="space-y-4 text-sm text-white/80">
                  <div>
                    <p className="text-white font-medium mb-2">
                      Life Safety Categories (L1&ndash;L5)
                    </p>
                    <div className="space-y-2">
                      <div className="flex gap-3">
                        <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                          L1
                        </span>
                        <span>
                          <strong className="text-white">
                            Full life safety coverage
                          </strong>{" "}
                          &mdash; automatic fire detectors throughout all areas
                          of the building (including roof voids, floor voids,
                          and concealed spaces). Provides the earliest possible
                          warning of fire. Typically specified for sleeping
                          accommodation and high-risk occupancies.
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                          L2
                        </span>
                        <span>
                          <strong className="text-white">
                            Escape routes plus high-risk areas
                          </strong>{" "}
                          &mdash; automatic detectors on escape routes and in
                          defined rooms or areas that present a high fire risk.
                          Extends beyond escape routes to protect specific areas
                          of concern.
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                          L3
                        </span>
                        <span>
                          <strong className="text-white">
                            Escape routes only
                          </strong>{" "}
                          &mdash; automatic detectors on escape routes (corridors,
                          stairways, circulation areas) to warn occupants when
                          fire threatens the means of escape. Does not provide
                          early detection of fire in rooms.
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                          L4
                        </span>
                        <span>
                          <strong className="text-white">
                            Within escape routes only
                          </strong>{" "}
                          &mdash; automatic detectors in specific parts of
                          escape routes, typically adjacent to high-risk areas.
                          Limited coverage for specific situations.
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                          L5
                        </span>
                        <span>
                          <strong className="text-white">
                            Bespoke life safety
                          </strong>{" "}
                          &mdash; a custom category where the type and location
                          of detectors are determined by a specific fire
                          engineering solution to satisfy a particular life
                          safety objective.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">
                      Property Protection Categories (P1&ndash;P2) and Manual (M)
                    </p>
                    <div className="space-y-2">
                      <div className="flex gap-3">
                        <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">
                          P1
                        </span>
                        <span>
                          <strong className="text-white">
                            Full property protection
                          </strong>{" "}
                          &mdash; automatic detectors throughout all areas to
                          detect fire at the earliest possible stage and
                          minimise damage to the building and its contents.
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">
                          P2
                        </span>
                        <span>
                          <strong className="text-white">
                            Defined high-risk areas
                          </strong>{" "}
                          &mdash; automatic detectors in defined rooms or areas
                          that present a high fire risk or contain high-value
                          assets.
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">
                          M
                        </span>
                        <span>
                          <strong className="text-white">
                            Manual system only
                          </strong>{" "}
                          &mdash; manual call points (break glass units) without
                          any automatic fire detectors. Relies entirely on human
                          detection and manual activation. Suitable only where
                          any fire is likely to be detected by occupants before
                          it threatens escape routes.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  System Types
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Conventional:</strong>{" "}
                      Detectors and call points wired in zones. The panel
                      identifies the zone in alarm but not the individual device.
                      Simple and cost-effective for smaller premises.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Addressable:</strong>{" "}
                      Each detector and call point has a unique address. The
                      panel identifies the specific device in alarm, allowing
                      precise location of the fire. Easier to maintain and
                      fault-find.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Analogue-addressable:
                      </strong>{" "}
                      Each detector continuously reports its analogue value
                      (smoke density, temperature) to the panel. The panel
                      makes the decision to raise the alarm based on
                      programmed thresholds and algorithms. Provides the
                      highest level of intelligence, sensitivity adjustment,
                      and pre-alarm warnings. Standard for large and complex
                      buildings.
                    </span>
                  </div>
                </div>
              </div>

              <p>
                <strong>Part 6</strong> (domestic premises) covers the
                provision of fire detection and alarm systems in dwellings,
                including houses, flats, maisonettes, and sheltered housing.
                It specifies different grades (A to F) and categories (LD1 to
                LD3) based on the type and extent of protection required.
              </p>

              <p>
                <strong>Part 8</strong> covers voice alarm systems &mdash;
                used in larger premises where a spoken message (either
                pre-recorded or live) is more effective than a simple tone for
                directing evacuation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">
                    RRFSO Connection:
                  </strong>{" "}
                  The RRFSO requires the responsible person to ensure that
                  premises are equipped with appropriate fire detection and fire
                  warning systems. BS 5839 is the standard against which fire
                  detection and alarm systems are designed, installed,
                  commissioned, and maintained. Fire risk assessors reference
                  BS 5839 when recommending system categories, and enforcing
                  authorities reference it when assessing compliance with the
                  RRFSO.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: BS 5266: Emergency Lighting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            BS 5266: Emergency Lighting
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>BS 5266-1</strong> is the code of practice for the
                emergency lighting of premises. Emergency lighting is a
                critical element of fire safety &mdash; it ensures that escape
                routes, exit signs, fire safety equipment, and high-risk areas
                remain illuminated when the normal lighting supply fails,
                allowing occupants to evacuate safely.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Types of Emergency Lighting System
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Maintained:</strong>{" "}
                      The emergency luminaire is illuminated at all times
                      (during normal operation and during mains failure). When
                      the mains fails, the luminaire switches to battery power
                      seamlessly. Used in places of entertainment, cinemas,
                      theatres, and other venues where lighting levels may be
                      deliberately lowered.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Non-maintained:</strong>{" "}
                      The emergency luminaire only illuminates when the normal
                      mains supply fails. During normal operation, the luminaire
                      is off and the battery is charging. This is the most
                      common type in offices, factories, shops, and commercial
                      buildings.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Categories of Emergency Lighting
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Escape route lighting:
                      </strong>{" "}
                      Illuminates defined escape routes to allow safe movement
                      towards and through exits. Minimum 1 lux at floor level
                      along the centre line of the escape route, with a
                      uniformity ratio not exceeding 40:1.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Open area (anti-panic) lighting:
                      </strong>{" "}
                      Illuminates large open areas (greater than 60 m&sup2;) to
                      reduce the risk of panic and enable occupants to reach an
                      escape route. Minimum 0.5 lux at floor level across the
                      open area.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        High-risk task area lighting:
                      </strong>{" "}
                      Illuminates areas where a potentially dangerous process or
                      situation needs to be made safe before evacuation &mdash;
                      for example, operating machinery, chemical processes, or
                      electrical switchgear. Minimum 10% of the normal
                      maintained illuminance (but not less than 15 lux).
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Duration Requirements and Testing
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">1 hour:</strong> Minimum
                      duration for most non-residential premises where
                      immediate evacuation is expected and re-occupation will
                      not occur until the normal supply is restored.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">3 hours:</strong> Required
                      for sleeping accommodation (hotels, hospitals, care homes,
                      hostels) and premises where re-occupation is likely before
                      the normal supply is restored.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Monthly tests:</strong>{" "}
                      Brief functional test &mdash; simulate mains failure for a
                      short period to verify that each luminaire illuminates
                      from its battery. Record results in the test log.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Annual tests:</strong>{" "}
                      Full-duration test &mdash; run the system on battery power
                      for the full rated duration (1 hour or 3 hours) to verify
                      that the batteries can sustain the luminaires for the
                      required period. Record results and replace any
                      luminaires or batteries that fail.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Power Sources for Emergency Lighting
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Self-contained battery:
                      </strong>{" "}
                      Each luminaire contains its own rechargeable battery. The
                      most common arrangement for small to medium-sized
                      installations. Simple to install but requires individual
                      testing and battery replacement.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Central battery system:
                      </strong>{" "}
                      A central battery supplies power to multiple luminaires
                      via a dedicated emergency lighting circuit. Easier to
                      maintain and test centrally. Used in larger installations.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Generator-fed:
                      </strong>{" "}
                      A standby generator provides the emergency supply. Must
                      have automatic changeover and start within 5 seconds (or
                      15 seconds where local battery backup covers the
                      changeover period). Used in hospitals, data centres, and
                      critical infrastructure.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: BS 9999 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            BS 9999: Fire Safety in the Design, Management and Use of Buildings
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>BS 9999</strong> provides an{" "}
                <strong>
                  alternative to Approved Document B
                </strong>{" "}
                for achieving compliance with the fire safety requirements of
                the Building Regulations. While Approved Document B provides
                prescriptive guidance (specific rules, dimensions, and
                performance criteria), BS 9999 offers a more{" "}
                <strong>flexible, risk-based approach</strong> that allows
                designers to develop bespoke fire safety solutions tailored to
                the specific characteristics of the building.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Features of BS 9999
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Risk profiles:</strong>{" "}
                      BS 9999 defines risk profiles based on occupancy
                      characteristics and the growth rate of fire. The risk
                      profile determines the fire safety measures required.
                      This allows a more nuanced assessment than the one-size
                      approach of Approved Document B.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Occupancy characteristics:
                      </strong>{" "}
                      The standard considers factors such as the alertness of
                      occupants (awake vs. sleeping), their familiarity with the
                      building, their mobility and capacity for self-evacuation,
                      and the density of occupation. These factors directly
                      influence the fire safety measures needed.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Complex and innovative designs:
                      </strong>{" "}
                      BS 9999 is particularly useful for buildings that do not
                      fit neatly into the prescriptive categories of Approved
                      Document B &mdash; such as open-plan atrium buildings,
                      mixed-use developments, buildings with unusual geometry,
                      or projects incorporating innovative fire safety
                      technologies (such as engineered smoke control systems or
                      water mist suppression).
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Interaction with the RRFSO:
                      </strong>{" "}
                      BS 9999 covers not only the design and construction phase
                      (Building Regulations) but also ongoing management and use
                      (which falls under the RRFSO). It provides guidance on
                      fire safety management, maintenance of fire safety systems,
                      and the ongoing fire risk assessment process &mdash;
                      making it a bridge between the two regulatory regimes.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">
                    Important Distinction:
                  </strong>{" "}
                  BS 9999 does not replace Approved Document B. Both are
                  acceptable routes to demonstrating compliance with Part B of
                  the Building Regulations. If BS 9999 is used, the designer
                  must demonstrate that the overall level of fire safety
                  achieved is at least equivalent to that provided by Approved
                  Document B. In practice, most standard buildings (offices,
                  shops, residential) will follow Approved Document B, while
                  BS 9999 is reserved for larger, more complex, or
                  architecturally innovative projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: CDM 2015 & Fire */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Construction Phase: CDM 2015 &amp; Fire
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The{" "}
                <strong>
                  Construction (Design and Management) Regulations 2015
                </strong>{" "}
                (CDM 2015) govern health and safety during the construction
                phase of building projects. Fire safety during construction is{" "}
                <strong>
                  managed separately from the RRFSO
                </strong>{" "}
                &mdash; the RRFSO applies to completed or occupied premises,
                while CDM 2015 applies to construction sites. This distinction
                is important because the fire risks on a construction site are
                very different from those in an occupied building.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Principal Contractor&rsquo;s Fire Safety Responsibilities
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fire plan:</strong>{" "}
                      Prepare a site-specific fire safety plan that identifies
                      fire risks, control measures, means of escape, fire
                      detection, fire-fighting equipment, emergency procedures,
                      and responsibilities. The fire plan must be updated as
                      the construction progresses and conditions change.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Temporary fire detection:
                      </strong>{" "}
                      Install temporary fire detection and alarm systems
                      appropriate to the stage of construction. This is
                      particularly important in multi-storey buildings under
                      construction, where workers may be spread across multiple
                      floors with limited visibility and communication.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Hot works management:
                      </strong>{" "}
                      Implement a hot works permit system for all welding,
                      cutting, brazing, grinding, and other operations
                      producing flame, sparks, or heat. Hot works are one of
                      the leading causes of construction site fires.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Means of escape:
                      </strong>{" "}
                      Ensure adequate means of escape for all workers on site,
                      including temporary staircases, scaffolding access routes,
                      and clearly marked escape routes. Escape routes must be
                      kept clear of debris, materials, and obstructions at all
                      times.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Fire-fighting equipment:
                      </strong>{" "}
                      Provide appropriate fire extinguishers, fire blankets, and
                      (where necessary) temporary fire suppression at each work
                      location. Ensure workers are trained in their use.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fire drills:</strong>{" "}
                      Conduct regular fire drills to ensure all workers know
                      the alarm signal, the escape routes, the assembly points,
                      and the procedures for reporting missing persons.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Joint Codes of Practice &amp; FPA RC 35/59
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The{" "}
                  <strong className="text-white">
                    Joint Codes of Practice on Fire Prevention in Construction
                  </strong>{" "}
                  (published by the Construction Industry Research and
                  Information Association, supported by the Fire Protection
                  Association) provide detailed guidance on fire prevention
                  measures during the construction phase. They cover topics
                  including:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Site security and arson prevention
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Storage and management of flammable materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Temporary heating and drying arrangements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Protection of completed fire safety measures during
                      ongoing construction work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Phased handover of fire safety systems as sections of the
                      building are completed and occupied
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white/80 mt-3">
                  <strong className="text-white">FPA RC 35/59</strong>{" "}
                  (Recommendations for Fire Prevention on Construction Sites)
                  is a complementary guidance document from the Fire Protection
                  Association that provides practical recommendations for
                  managing fire risk on construction sites, including specific
                  guidance on timber-frame construction, refurbishment projects,
                  and high-rise construction.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HardHat className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Electricians on Construction Sites
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  As an electrician working on a construction site, you must
                  follow the principal contractor&rsquo;s fire plan, comply
                  with the hot works permit system (if carrying out any work
                  that produces sparks or heat), maintain temporary fire
                  detection systems that you have installed, keep escape routes
                  clear of cables and equipment, and report any fire hazards
                  you identify. Remember that during construction, fire
                  compartmentation may be incomplete, permanent fire detection
                  may not yet be operational, and the building may have limited
                  means of escape &mdash; making fire safety vigilance even
                  more critical.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fire Safety Legislation Map */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">
            Fire Safety Legislation Map
          </h2>
          <div className="bg-gradient-to-br from-rose-500/10 via-rose-400/5 to-transparent border border-rose-500/30 rounded-xl p-5 sm:p-6">
            <p className="text-sm text-white/60 mb-5 text-center">
              How the key fire safety laws and standards interconnect
            </p>

            {/* Top tier: Overarching legislation */}
            <div className="flex justify-center mb-4">
              <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-3 text-center max-w-xs">
                <p className="text-rose-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Overarching
                </p>
                <p className="text-white text-sm font-bold">
                  Health &amp; Safety at Work Act 1974
                </p>
                <p className="text-white/60 text-xs mt-1">
                  General duty of care &mdash; Sections 2&ndash;9
                </p>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-6 bg-rose-500/40" />
            </div>

            {/* Second tier: Main regulations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
                <p className="text-rose-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Fire-Specific
                </p>
                <p className="text-white text-sm font-bold">
                  RRFSO 2005
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Fire risk assessment, fire safety duties
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
                <p className="text-rose-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Management
                </p>
                <p className="text-white text-sm font-bold">
                  Management Regs 1999
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Risk assessment, competent persons, training
                </p>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-6 bg-rose-500/40" />
            </div>

            {/* Third tier: Building regs and construction */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
                <p className="text-amber-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Building Design
                </p>
                <p className="text-white text-sm font-bold">
                  Building Regs Part B / ADB
                </p>
                <p className="text-white/60 text-xs mt-1">
                  B1&ndash;B5: Warning, escape, fire spread, access
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
                <p className="text-amber-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Construction Phase
                </p>
                <p className="text-white text-sm font-bold">CDM 2015</p>
                <p className="text-white/60 text-xs mt-1">
                  Fire plan, temporary detection, hot works
                </p>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-6 bg-rose-500/40" />
            </div>

            {/* Bottom tier: British Standards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-center">
                <p className="text-green-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Detection
                </p>
                <p className="text-white text-sm font-bold">BS 5839</p>
                <p className="text-white/60 text-xs mt-1">
                  Fire detection &amp; alarm systems
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-center">
                <p className="text-green-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Lighting
                </p>
                <p className="text-white text-sm font-bold">BS 5266</p>
                <p className="text-white/60 text-xs mt-1">
                  Emergency escape lighting
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-center">
                <p className="text-green-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                  Design
                </p>
                <p className="text-white text-sm font-bold">BS 9999</p>
                <p className="text-white/60 text-xs mt-1">
                  Risk-based fire safety design
                </p>
              </div>
            </div>

            <p className="text-xs text-white/40 text-center mt-5">
              All standards support compliance with the RRFSO and Building
              Regulations &mdash; they do not operate in isolation
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Fire Risk Assessment
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-3">
              Continue to Module 3
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
