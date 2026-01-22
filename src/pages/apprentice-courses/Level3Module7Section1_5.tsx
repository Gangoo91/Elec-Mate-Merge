/**
 * Level 3 Module 7 Section 1.5 - Progression into Higher Qualifications
 * Pathways to advanced qualifications and career progression opportunities
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Progression into Higher Qualifications - Level 3 Module 7 Section 1.5";
const DESCRIPTION = "Exploring HNC, HND, Foundation Degrees, and degree routes for electricians seeking advanced qualifications and career progression in electrical engineering.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What qualification level is an HNC (Higher National Certificate)?",
    options: [
      "Level 3",
      "Level 4",
      "Level 5",
      "Level 6"
    ],
    correctIndex: 1,
    explanation: "An HNC is a Level 4 qualification, equivalent to the first year of a university degree. It provides a stepping stone from Level 3 vocational qualifications towards higher education and more technical roles."
  },
  {
    id: "check-2",
    question: "What is a typical study mode for working electricians pursuing an HNC?",
    options: [
      "Full-time study only",
      "Part-time day release or evening classes",
      "Online only with no face-to-face contact",
      "Summer school intensive courses only"
    ],
    correctIndex: 1,
    explanation: "Most working electricians study HNC part-time, either through day release (one day per week from work) or evening classes. This allows them to continue working while gaining higher qualifications."
  },
  {
    id: "check-3",
    question: "What career opportunities typically open up with higher qualifications like HNC/HND?",
    options: [
      "Basic installation work only",
      "Design, project management, and senior technical roles",
      "Retail sales only",
      "Manual labour roles"
    ],
    correctIndex: 1,
    explanation: "Higher qualifications open doors to roles such as electrical designer, project manager, estimator, contracts manager, building services engineer, and consultancy positions - roles requiring deeper technical knowledge."
  },
  {
    id: "check-4",
    question: "What is the relationship between HND and university degree entry?",
    options: [
      "HND holders cannot attend university",
      "HND can give direct entry to second or third year of a related degree",
      "HND is higher than a degree",
      "There is no connection between HND and degrees"
    ],
    correctIndex: 1,
    explanation: "An HND (Level 5) can often allow direct entry to the second or even third year of a related degree programme, significantly reducing the time and cost to achieve a full degree qualification."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What level qualification is an HND (Higher National Diploma)?",
    options: [
      "Level 3",
      "Level 4",
      "Level 5",
      "Level 6"
    ],
    correctAnswer: 2,
    explanation: "An HND is a Level 5 qualification, equivalent to the second year of a university degree. It is a step above the HNC (Level 4) and can lead to final year degree entry."
  },
  {
    id: 2,
    question: "What subjects would typically be covered in an Electrical/Electronic Engineering HNC?",
    options: [
      "Basic domestic wiring only",
      "Advanced maths, electrical principles, control systems, power electronics",
      "Customer service skills only",
      "Marketing and sales"
    ],
    correctAnswer: 1,
    explanation: "HNC programmes cover advanced topics including engineering mathematics, electrical principles, power systems, control systems, electronics, and project management - building on Level 3 foundations."
  },
  {
    id: 3,
    question: "How long does an HNC typically take to complete part-time?",
    options: [
      "6 months",
      "1 year",
      "2 years",
      "4 years"
    ],
    correctAnswer: 2,
    explanation: "An HNC typically takes 2 years to complete when studied part-time (day release or evening). Full-time study would be around 1 year."
  },
  {
    id: 4,
    question: "What is a Foundation Degree?",
    options: [
      "Level 3 qualification",
      "Level 5 work-based degree combining academic and practical learning",
      "Entry requirement for apprenticeship",
      "Health and safety certificate"
    ],
    correctAnswer: 1,
    explanation: "A Foundation Degree is a Level 5 qualification that combines academic study with work-based learning. It is equivalent to the first two years of a bachelor's degree and is designed for those in employment."
  },
  {
    id: 5,
    question: "What professional body membership might be relevant for those with higher qualifications?",
    options: [
      "None - professional bodies are only for graduates",
      "IET (Institution of Engineering and Technology) membership",
      "Golf club membership",
      "Trade union membership only"
    ],
    correctAnswer: 1,
    explanation: "The IET (Institution of Engineering and Technology) offers membership grades suitable for those with HNC/HND or degree qualifications. This demonstrates professional standing and provides access to resources and networking."
  },
  {
    id: 6,
    question: "What career role specifically requires higher level qualifications and design expertise?",
    options: [
      "Apprentice electrician",
      "Building Services Engineer or Electrical Design Engineer",
      "Electrical labourer",
      "Van driver"
    ],
    correctAnswer: 1,
    explanation: "Building Services Engineers and Electrical Design Engineers typically require degree-level or HNC/HND qualifications, as these roles involve complex calculations, system design, and coordination of building services."
  },
  {
    id: 7,
    question: "What is the Regulated Qualifications Framework (RQF) level for a Bachelor's degree?",
    options: [
      "Level 4",
      "Level 5",
      "Level 6",
      "Level 7"
    ],
    correctAnswer: 2,
    explanation: "A Bachelor's degree (BEng, BSc) is a Level 6 qualification. A Master's degree is Level 7. The HNC (Level 4) and HND (Level 5) provide progression routes towards these higher qualifications."
  },
  {
    id: 8,
    question: "What funding support might be available for higher education study?",
    options: [
      "No funding is available",
      "Student loans, employer sponsorship, part-time work grants",
      "Free for everyone",
      "Only government employees can access funding"
    ],
    correctAnswer: 1,
    explanation: "Funding options include: student loans (for tuition and maintenance), employer sponsorship or fee contribution, part-time learner loans, and sometimes grants from professional bodies or charities."
  },
  {
    id: 9,
    question: "What is a key advantage of the part-time study route for working electricians?",
    options: [
      "It's faster than full-time",
      "Maintaining income while gaining qualifications and applying learning directly to work",
      "No exams required",
      "Free qualification"
    ],
    correctAnswer: 1,
    explanation: "Part-time study allows electricians to continue earning while gaining qualifications. Additionally, workplace experience can be directly applied to academic assignments and vice versa, enhancing both learning and job performance."
  },
  {
    id: 10,
    question: "What type of role might suit someone who enjoys the technical aspects but wants to move away from hands-on installation?",
    options: [
      "Labourer",
      "Technical Sales, Estimating, or CAD Technician roles",
      "Only management",
      "No options exist"
    ],
    correctAnswer: 1,
    explanation: "Higher qualifications open roles like Technical Sales Engineer, Estimator, CAD Technician, or Design Engineer - using electrical knowledge but focusing on design, specification, or commercial aspects rather than physical installation."
  }
];

const faqs = [
  {
    question: "Do I need higher qualifications to progress in the electrical industry?",
    answer: "Not necessarily. Many successful electricians build excellent careers through practical expertise, business ownership, or specialisation without formal higher qualifications. However, certain roles (design, consultancy, senior management in larger organisations) often require or prefer candidates with HNC/HND or degree qualifications."
  },
  {
    question: "How much does it cost to study for an HNC/HND?",
    answer: "Costs vary by provider and study mode. Part-time HNC courses typically cost £2,000-5,000 per year. Student loans are available for eligible courses. Some employers will sponsor or contribute to costs. Compare different providers and consider total cost including time off work versus evening study."
  },
  {
    question: "Can I go straight from Level 3 to university?",
    answer: "Some universities accept Level 3 qualifications for degree entry, though requirements vary. The HNC/HND route is often preferred as it: builds advanced knowledge progressively, allows continued employment, and can give advanced entry to degree programmes. Check specific university requirements for your target course."
  },
  {
    question: "What is EngTech registration and how do I achieve it?",
    answer: "EngTech (Engineering Technician) is a professional registration through bodies like the IET. It requires: approved qualifications (Level 3 minimum, Level 4+ preferred), demonstrated competence, and commitment to professional standards and CPD. Registration provides professional recognition and can support career progression."
  },
  {
    question: "Is it worth getting a degree if I already work as an electrician?",
    answer: "It depends on your career goals. A degree is valuable if you want to move into design, consultancy, project management at senior level, or work internationally (where degrees may be required). If you plan to remain in hands-on installation or run a small contracting business, practical experience and business skills may be more valuable than academic qualifications."
  },
  {
    question: "What is the difference between BEng and BSc in electrical engineering?",
    answer: "BEng (Bachelor of Engineering) is typically more vocationally focused and often accredited by professional bodies towards Chartered Engineer status. BSc (Bachelor of Science) may be more theory-focused or broader in scope. For electrical engineering careers, BEng is often preferred, but both are valid degree qualifications at Level 6."
  }
];

const Level3Module7Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

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
            <Link to="/study-centre/apprentice/level3-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>HNC (Level 4):</strong> First step beyond Level 3, 2 years part-time</li>
              <li><strong>HND (Level 5):</strong> Builds on HNC, can lead to degree entry</li>
              <li><strong>Degree (Level 6):</strong> BEng/BSc for design and management roles</li>
              <li><strong>Part-time Study:</strong> Continue working while gaining qualifications</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Career Impact</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Design Roles:</strong> System design and specification</li>
              <li><strong>Management:</strong> Project and contracts management</li>
              <li><strong>Consultancy:</strong> Technical advisory roles</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01 - Qualifications Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding the Qualifications Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Regulated Qualifications Framework (RQF) provides a structure for understanding how different qualifications relate to each other. Having completed Level 3 (apprenticeship standard), several progression routes are available leading to Level 4, 5, 6 and beyond.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Qualification Levels Progression:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Level 3</strong> - Apprenticeship, NVQ L3, Technical Certificate (your current level)</li>
                <li><strong>Level 4</strong> - HNC (Higher National Certificate), Certificate of Higher Education</li>
                <li><strong>Level 5</strong> - HND (Higher National Diploma), Foundation Degree, Diploma of Higher Education</li>
                <li><strong>Level 6</strong> - Bachelor's Degree (BEng, BSc), Degree Apprenticeship</li>
                <li><strong>Level 7</strong> - Master's Degree (MEng, MSc), Postgraduate Certificate/Diploma</li>
              </ul>
            </div>

            <p>
              Higher qualifications are not mandatory for all career paths. Many excellent careers in installation, maintenance, and business ownership thrive on Level 3 qualifications plus experience. However, certain specialist and senior roles - particularly in design, consultancy, and large organisation management - often require higher qualifications.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Consider Carefully:</strong> Higher qualifications require significant time, money, and effort. Ensure they align with your career goals before committing. A successful installation business may be better served by business skills training than academic qualifications.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 - HNC and HND */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            HNC and HND Qualifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Higher National Certificates (HNC) and Diplomas (HND) are vocationally focused qualifications delivered by colleges and some universities. They provide a progression route from Level 3 that is more practically oriented than traditional academic degrees while still developing advanced knowledge.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">HNC (Level 4) Content</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Engineering mathematics</li>
                  <li>Electrical and electronic principles</li>
                  <li>Engineering science</li>
                  <li>Project management fundamentals</li>
                  <li>Typically 2 years part-time</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">HND (Level 5) Additional Content</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Power systems and distribution</li>
                  <li>Control systems and automation</li>
                  <li>Research project</li>
                  <li>Specialist elective units</li>
                  <li>Further 1-2 years part-time after HNC</li>
                </ul>
              </div>
            </div>

            <p>
              Part-time study options allow working electricians to continue earning while gaining qualifications. Day release (one day per week from work) and evening classes are common arrangements. Employers often support this through time off and sometimes fee contributions.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Practical Benefit:</strong> HNC/HND study develops understanding of why things work, not just how. This deeper knowledge improves fault-finding abilities, enables engagement with design work, and provides foundation for technical discussions with engineers and consultants.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 - Degree Routes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            University Degrees and Foundation Degrees
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For those seeking the highest level of technical qualification, university degrees offer comprehensive education in electrical engineering principles. Several routes exist, including direct entry from Level 3, progression from HNC/HND, or Foundation Degrees combining work and study.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Degree Route Options:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Traditional BEng/BSc</strong> - 3-4 years full-time, or 5-6 years part-time. Deep technical education.</li>
                <li><strong>HND + Top-up</strong> - Complete HND, then enter final year(s) of degree programme.</li>
                <li><strong>Foundation Degree</strong> - Work-based Level 5 qualification, can top-up to full degree.</li>
                <li><strong>Degree Apprenticeship</strong> - Employer-sponsored degree while working (4-5 years).</li>
              </ul>
            </div>

            <p>
              Foundation Degrees are specifically designed for those in employment, combining academic learning with workplace application. They are offered by colleges and universities in partnership, often with flexible study patterns suited to working professionals.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Degree Apprenticeships:</strong> These combine full-time work with degree study, with the employer paying fees. They are highly competitive but offer an excellent route to degree-level qualification without student debt. Look for opportunities with larger contractors or building services firms.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 - Career Opportunities */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Career Opportunities with Higher Qualifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Higher qualifications open doors to roles that may be difficult to access through experience alone. These positions often involve design, management, or specialist technical work rather than hands-on installation.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Design Roles</p>
                <p className="text-white/90 text-xs">Electrical Designer, CAD Technician, Building Services Engineer</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Management Roles</p>
                <p className="text-white/90 text-xs">Project Manager, Contracts Manager, Operations Director</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Specialist Roles</p>
                <p className="text-white/90 text-xs">Consultant, Technical Sales, Estimator, Training Provider</p>
              </div>
            </div>

            <p>
              Professional registration through bodies like the IET becomes accessible with higher qualifications. EngTech (Engineering Technician), IEng (Incorporated Engineer), and CEng (Chartered Engineer) status provide professional recognition and can enhance career prospects, particularly in consultancy and senior roles.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Career Example:</strong> An electrician with HND and experience might progress to Electrical Designer, creating specifications and drawings for new builds. With further experience and possibly degree completion, they could become a Senior Building Services Engineer or move into consultancy, advising clients on electrical strategy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Deciding if Higher Qualifications are Right for You</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider your career goals - what role do you ultimately want?</li>
                <li>Research job adverts for target roles - what qualifications do they require?</li>
                <li>Assess your personal circumstances - can you commit to years of study?</li>
                <li>Talk to people in roles you aspire to - what route did they take?</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Making Part-time Study Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Discuss with employer early - secure time off and potential support</li>
                <li>Create a realistic study schedule that accounts for work demands</li>
                <li>Build a support network - family understanding and study groups help</li>
                <li>Link assignments to workplace where possible for efficiency</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Studying for the wrong reasons</strong> - Don't pursue qualifications without clear career purpose</li>
                <li><strong>Underestimating commitment</strong> - Part-time study alongside work is demanding</li>
                <li><strong>Neglecting practical experience</strong> - Qualifications without experience have limited value</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Qualification Levels</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Vocational Route</p>
                <ul className="space-y-0.5">
                  <li>Level 3: Apprenticeship/NVQ</li>
                  <li>Level 4: HNC</li>
                  <li>Level 5: HND/Foundation Degree</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Academic Route</p>
                <ul className="space-y-0.5">
                  <li>Level 6: BEng/BSc Degree</li>
                  <li>Level 7: MEng/MSc Master's</li>
                  <li>Professional: CEng Registration</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Apprenticeships
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section2">
              Next: Professional Standards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module7Section1_5;
