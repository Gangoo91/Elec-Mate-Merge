import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Mapping Evidence to Standards - MOET Module 7 Section 3.4";
const DESCRIPTION = "Creating and maintaining a KSB mapping matrix for the EPA portfolio: cross-referencing evidence to the ST1426 standard requirements, conducting gap analysis and ensuring comprehensive coverage.";

const quickCheckQuestions = [
  {
    id: "mapping-purpose",
    question: "What is the primary purpose of a KSB mapping matrix?",
    options: [
      "To make the portfolio look more organised",
      "To systematically cross-reference your evidence to the specific knowledge, skills and behaviours required by the ST1426 standard, ensuring complete coverage",
      "To list all the tasks you have completed",
      "It is only needed for distinction-grade candidates"
    ],
    correctIndex: 1,
    explanation: "The KSB mapping matrix is your evidence management tool. It links each piece of portfolio evidence to the specific requirements of the standard, makes it easy to identify gaps, and helps the assessor verify that all areas are covered. Without it, evidence is just a collection of documents — with it, the evidence tells a coherent story of competence."
  },
  {
    id: "mapping-cross-ref",
    question: "Why is it beneficial to cross-reference a single piece of evidence to multiple KSBs?",
    options: [
      "It reduces the amount of evidence you need to collect",
      "One activity can genuinely demonstrate multiple competences simultaneously — for example, a fault diagnosis task may demonstrate technical knowledge, practical skills, safety awareness and professional communication",
      "It is a shortcut to fill the matrix quickly",
      "It is not acceptable — each evidence should link to only one KSB"
    ],
    correctIndex: 1,
    explanation: "Real-world activities naturally involve multiple competences. A single maintenance task might demonstrate fault diagnosis knowledge (K), practical testing skills (S), safe working behaviours (B), and professional communication (B). Cross-referencing captures this reality and reduces the total volume of evidence needed while ensuring comprehensive coverage."
  },
  {
    id: "mapping-gaps",
    question: "What should you do when your mapping matrix reveals a gap in evidence coverage?",
    options: [
      "Ignore it — the assessor may not notice",
      "Plan with your employer and training provider to access activities that will generate evidence for the missing KSBs, allowing sufficient time before the EPA",
      "Write a reflective account about the topic even if you have no real experience",
      "Ask another apprentice for their evidence"
    ],
    correctIndex: 1,
    explanation: "Gaps identified early can be addressed through planned workplace activities, additional experience in different areas, or targeted training. Discuss gaps with your employer (to arrange relevant activities) and training provider (to ensure you have time). Discovering gaps too late leaves no time to generate genuine evidence."
  },
  {
    id: "mapping-review",
    question: "How often should you review and update your KSB mapping matrix?",
    options: [
      "Only once, when you first create it",
      "At every progress review with your training provider, and whenever new evidence is added to the portfolio, with a thorough review at least three months before the EPA",
      "Only in the final week before the EPA",
      "Your training provider handles all updates"
    ],
    correctIndex: 1,
    explanation: "The mapping matrix is a living document that should be updated continuously. Reviewing it at every progress meeting ensures gaps are identified early. Adding new evidence references as you collect them keeps the matrix current. A thorough review three months before the EPA gives enough time to address any remaining gaps."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A KSB mapping matrix for the MOET EPA should list:",
    options: [
      "Only the skills from the standard",
      "All knowledge, skills and behaviour requirements from the ST1426 standard, with cross-references to the evidence that demonstrates each one",
      "Only the KSBs you feel confident about",
      "The modules from your college course"
    ],
    correctAnswer: 1,
    explanation: "The matrix must cover every K, S and B from the standard — not just the ones you feel strong on. This ensures complete coverage and reveals any areas that need attention. The assessor uses the matrix to verify your evidence addresses the full standard."
  },
  {
    id: 2,
    question: "The most effective way to organise a KSB mapping matrix is:",
    options: [
      "Alphabetically by evidence title",
      "With KSBs listed in rows and evidence items in columns (or vice versa), with clear markings showing which evidence demonstrates which KSBs",
      "In order of when the evidence was collected",
      "As a simple list with no cross-references"
    ],
    correctAnswer: 1,
    explanation: "A grid or matrix format (KSBs on one axis, evidence on the other) provides the clearest visual representation of coverage. Use tick marks, colours or reference codes to show links. This makes gaps immediately visible and helps the assessor navigate your portfolio efficiently."
  },
  {
    id: 3,
    question: "When mapping evidence to KSBs, you should consider:",
    options: [
      "Only the most obvious link",
      "All the KSBs that the evidence genuinely demonstrates, including knowledge applied, skills used, and behaviours exhibited during the activity",
      "Only knowledge requirements",
      "Only practical skills"
    ],
    correctAnswer: 1,
    explanation: "A maintenance activity typically involves knowledge (understanding the system), skills (practical techniques) and behaviours (safety, communication, professionalism) simultaneously. Mapping all genuine links maximises the evidence value and demonstrates integrated competence — you apply knowledge, skills and behaviours together in practice."
  },
  {
    id: 4,
    question: "If your mapping matrix shows that one KSB has only a single weak piece of evidence, you should:",
    options: [
      "It is fine — one piece is enough",
      "Seek to strengthen that area by gathering additional or better-quality evidence, such as a more detailed activity log entry, a reflective account, or a witness statement covering that KSB",
      "Remove the KSB from the matrix",
      "Copy evidence from another KSB section"
    ],
    correctAnswer: 1,
    explanation: "A single weak piece of evidence for a KSB is a risk. The assessor may probe this area in the professional discussion, and if you cannot demonstrate competence, it could affect your grade. Strengthening evidence through additional activity logs, reflective accounts or witness statements provides a more robust evidence base."
  },
  {
    id: 5,
    question: "The mapping matrix should be reviewed:",
    options: [
      "Only once, when first created",
      "Regularly throughout the apprenticeship — typically at each progress review with your training provider — and updated as new evidence is added",
      "Only in the final month before the EPA",
      "It does not need reviewing once completed"
    ],
    correctAnswer: 1,
    explanation: "Regular review ensures your matrix stays current and identifies gaps early. Review it at each progress meeting with your training provider, update it as you add new evidence, and conduct a thorough review at least three months before the EPA to allow time to address any remaining gaps."
  },
  {
    id: 6,
    question: "Colour coding in a mapping matrix is useful for:",
    options: [
      "Making it look attractive",
      "Providing a quick visual indication of evidence strength — for example, green for well-evidenced KSBs, amber for adequate but could be stronger, and red for gaps that need addressing",
      "It is not necessary",
      "Showing which evidence was most recent"
    ],
    correctAnswer: 1,
    explanation: "A traffic-light colour system (green/amber/red) makes the matrix a powerful planning tool. At a glance, you and your training provider can see overall readiness and focus attention on areas that need work. It also demonstrates a professional, organised approach to your apprenticeship."
  },
  {
    id: 7,
    question: "Behaviours in the ST1426 standard (the 'B' in KSBs) are best evidenced through:",
    options: [
      "Statements saying you have good behaviour",
      "Specific examples of professional behaviours demonstrated during real workplace activities — described in activity logs, witnessed by others, or reflected upon in written accounts",
      "Attendance records",
      "Employer references"
    ],
    correctAnswer: 1,
    explanation: "Behaviours must be demonstrated through actions, not just claimed. Evidence of teamwork, communication, safety awareness, initiative and professionalism comes from describing specific instances where you exhibited these behaviours. Witness statements from supervisors confirming observed behaviours are particularly effective."
  },
  {
    id: 8,
    question: "An evidence reference code system in the matrix helps by:",
    options: [
      "Making it look more complicated",
      "Enabling quick location of specific evidence within the portfolio — each piece of evidence has a unique code that the matrix references, making it easy to find the actual document",
      "It is unnecessary",
      "Replacing the need for a contents page"
    ],
    correctAnswer: 1,
    explanation: "A simple reference system (e.g., WL-01 for Work Log 1, RA-03 for Reflective Account 3, WS-02 for Witness Statement 2) enables both you and the assessor to quickly locate the actual evidence from the matrix. It demonstrates organisation and professionalism."
  },
  {
    id: 9,
    question: "If an activity demonstrates a skill (S) but you are unsure whether it also demonstrates the related knowledge (K), you should:",
    options: [
      "Only map it to the skill",
      "Consider whether your log entry or reflective account explains the underpinning knowledge — if it does, map it to both; if not, add an explanation of the knowledge applied to strengthen the evidence",
      "Map it to both anyway",
      "Ask your assessor"
    ],
    correctAnswer: 1,
    explanation: "Knowledge is best evidenced when you can explain why you did something, not just what you did. If your evidence describes the practical activity but does not explain the underpinning knowledge, consider adding a reflective account or expanding the log entry to include the reasoning. This strengthens the evidence for both K and S."
  },
  {
    id: 10,
    question: "The final version of your mapping matrix before the EPA should:",
    options: [
      "Be a rough draft",
      "Show complete coverage of all KSBs with at least one strong piece of evidence for each, use consistent reference codes, and be presented in a clear format that the assessor can navigate easily",
      "Only cover the KSBs you expect to be asked about",
      "Be completed by your training provider"
    ],
    correctAnswer: 1,
    explanation: "The final matrix should be complete, accurate and well-presented. Every KSB should have at least one strong piece of evidence (ideally multiple). Reference codes should be consistent, and the format should allow the assessor to quickly verify coverage and locate specific evidence."
  },
  {
    id: 11,
    question: "During the professional discussion, the assessor may use your mapping matrix to:",
    options: [
      "Check your handwriting",
      "Identify areas to probe with questions — particularly KSBs where evidence appears weaker — to verify your understanding and competence through discussion",
      "Grade your organisational skills only",
      "Compare your matrix with other candidates"
    ],
    correctAnswer: 1,
    explanation: "The assessor uses the matrix as a discussion planning tool. They may focus questions on areas where evidence is thinner, or ask you to expand on evidence that appears particularly interesting. Being prepared to discuss every mapped evidence item confidently is essential."
  },
  {
    id: 12,
    question: "When starting your mapping matrix at the beginning of the apprenticeship, the most important first step is:",
    options: [
      "Waiting until you have some evidence to map",
      "Listing every KSB from the official ST1426 assessment plan so you have a complete framework to populate as you gather evidence throughout the apprenticeship",
      "Copying another apprentice's completed matrix",
      "Asking your training provider to create it for you"
    ],
    correctAnswer: 1,
    explanation: "Starting with the complete list of KSBs from the official ST1426 assessment plan creates your framework from day one. As you complete activities and gather evidence, you populate the matrix progressively. This approach means you always have a clear picture of which areas are covered and which still need attention, enabling strategic planning throughout the apprenticeship."
  }
];

const faqs = [
  {
    question: "Should I create the mapping matrix at the start or end of the apprenticeship?",
    answer: "Create a draft at the start listing all KSBs from the standard, then build it progressively as you gather evidence. Starting early means you always know where your gaps are and can plan activities to fill them. Leaving it to the end means you may discover gaps too late to address."
  },
  {
    question: "My training provider uses an e-portfolio system with built-in mapping. Is that sufficient?",
    answer: "E-portfolio mapping tools are very useful and often align directly with the standard. Check that the system covers all KSBs in the ST1426 standard and that you can generate a clear overview showing coverage. If the system does not produce a clear matrix view, consider creating a supplementary mapping document."
  },
  {
    question: "How many pieces of evidence should I map to each KSB?",
    answer: "There is no fixed number, but aim for at least 2-3 pieces of evidence per KSB where possible. This provides redundancy — if one piece is weaker, the others compensate. Some KSBs may naturally have more evidence than others, and that is fine as long as every KSB has at least one strong piece."
  },
  {
    question: "Can I map evidence to KSBs from different modules of the apprenticeship, or only Module 7?",
    answer: "Evidence from any stage of your apprenticeship can be mapped. In fact, evidence from earlier modules often demonstrates knowledge (K), while later activities demonstrate the application of that knowledge as skills (S). Cross-referencing across your entire apprenticeship experience shows development over time."
  },
  {
    question: "What if my EPAO uses different KSB numbering than the standard?",
    answer: "Always use the numbering from the official ST1426 apprenticeship standard as your primary reference. If your EPAO uses different codes, create a cross-reference between the two systems. Your training provider should be able to clarify any differences between the standard and EPAO-specific requirements."
  }
];

const MOETModule7Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 7.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Mapping Evidence to Standards
          </h1>
          <p className="text-white/80">
            Creating and maintaining a KSB mapping matrix for comprehensive EPA portfolio coverage
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Tool:</strong> KSB mapping matrix linking evidence to standard</li>
              <li className="pl-1"><strong>Coverage:</strong> Every K, S and B in the ST1426 standard</li>
              <li className="pl-1"><strong>Cross-referencing:</strong> One evidence item can map to multiple KSBs</li>
              <li className="pl-1"><strong>Gap analysis:</strong> Reveals areas needing more evidence</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Assessor navigation:</strong> Matrix helps assessor find evidence quickly</li>
              <li className="pl-1"><strong>Discussion planning:</strong> Assessor uses matrix to plan questions</li>
              <li className="pl-1"><strong>Completeness:</strong> Demonstrates all standard areas covered</li>
              <li className="pl-1"><strong>ST1426:</strong> Direct traceability to standard requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Create a comprehensive KSB mapping matrix covering the full ST1426 standard",
              "Cross-reference evidence to multiple KSBs to maximise portfolio efficiency",
              "Conduct regular gap analysis to identify areas needing additional evidence",
              "Use colour coding and reference systems for clear, professional presentation",
              "Distinguish between knowledge, skills and behaviours in your evidence mapping",
              "Prepare your mapping matrix for assessor review and professional discussion"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding KSB Mapping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The KSB mapping matrix is the single most important organisational tool in your portfolio. It
              transforms a collection of documents into a structured demonstration of competence. Without
              mapping, even excellent evidence can be overlooked because the assessor cannot see how it links
              to the standard.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Three Components of KSBs</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Knowledge (K):</strong> What you understand — technical theory, regulations, standards,
                  principles. Evidenced through explanations of why you did something, not just what you did
                </li>
                <li className="pl-1">
                  <strong>Skills (S):</strong> What you can do — practical abilities demonstrated through workplace
                  activities. Evidenced through activity logs, witness statements and photographs showing competent
                  performance
                </li>
                <li className="pl-1">
                  <strong>Behaviours (B):</strong> How you conduct yourself — professionalism, safety awareness,
                  communication, teamwork. Evidenced through descriptions of your approach and conduct during
                  activities, and confirmed by witness observations
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">All KSBs Must Be Covered</p>
              <p className="text-sm text-white">
                The assessor will check that every KSB in the standard has been addressed. A single uncovered
                KSB could affect your grade or delay your assessment. Start mapping early so you have maximum
                time to fill any gaps that emerge.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The mapping matrix is your evidence of evidence. It is the document
              that ties everything together and proves to the assessor that your portfolio is complete,
              well-organised, and ready for the professional discussion.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Building Your Mapping Matrix
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Creating an effective matrix involves listing every requirement from the standard, cataloguing
              your evidence, and then systematically linking the two. The format should make it easy to see
              coverage at a glance and quickly locate specific evidence.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step-by-Step Matrix Construction</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Step 1:</strong> List every KSB from the ST1426 standard — use the official assessment
                  plan, not a summary
                </li>
                <li className="pl-1">
                  <strong>Step 2:</strong> Create a reference system for your evidence (e.g., WL-01, RA-01,
                  WS-01, PH-01)
                </li>
                <li className="pl-1">
                  <strong>Step 3:</strong> For each piece of evidence, identify all KSBs it genuinely demonstrates
                </li>
                <li className="pl-1">
                  <strong>Step 4:</strong> Enter the evidence references against each relevant KSB in the matrix
                </li>
                <li className="pl-1">
                  <strong>Step 5:</strong> Apply colour coding — green for well-evidenced, amber for adequate,
                  red for gaps
                </li>
                <li className="pl-1">
                  <strong>Step 6:</strong> Create a brief description column noting what each evidence item shows
                  for each KSB
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example Matrix Extract</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">KSB Ref</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Evidence</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K3</td>
                      <td className="border border-white/10 px-3 py-2">Electrical principles and theory</td>
                      <td className="border border-white/10 px-3 py-2">RA-01, WL-03, WL-07</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Strong</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S5</td>
                      <td className="border border-white/10 px-3 py-2">Fault diagnosis techniques</td>
                      <td className="border border-white/10 px-3 py-2">WL-04, WS-02, PH-03</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Strong</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S9</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning activities</td>
                      <td className="border border-white/10 px-3 py-2">WL-08</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Adequate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">B4</td>
                      <td className="border border-white/10 px-3 py-2">Continuous improvement</td>
                      <td className="border border-white/10 px-3 py-2">--</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Gap</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The matrix is a living document. Update it every time you add new
              evidence to your portfolio. A current, accurate matrix is one of the most powerful tools for
              EPA preparation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Conducting Gap Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Gap analysis is the process of reviewing your mapping matrix to identify KSBs that lack sufficient
              evidence. It should be conducted regularly — at least quarterly and at every progress review — with
              a comprehensive review at least three months before the EPA.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conducting Effective Gap Analysis</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Red gaps:</strong> KSBs with no evidence at all — these are your top priority. Plan
                  specific activities to generate evidence
                </li>
                <li className="pl-1">
                  <strong>Amber areas:</strong> KSBs with only one piece of evidence or evidence that lacks
                  detail — seek to strengthen with additional logs, reflective accounts or witness statements
                </li>
                <li className="pl-1">
                  <strong>Green areas:</strong> Well-evidenced KSBs — ensure the evidence is still current and
                  that you can discuss it confidently
                </li>
                <li className="pl-1">
                  <strong>Action planning:</strong> For each gap, agree specific actions with your employer and
                  training provider, including deadlines
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Behaviour Gaps</p>
              <p className="text-sm text-white">
                Behaviours (B) are often the hardest KSBs to evidence explicitly. Apprentices frequently forget
                to describe their professional conduct, communication approach and teamwork in activity logs.
                Review your entries — if they only describe technical actions without mentioning how you
                communicated, collaborated or demonstrated initiative, add reflective commentary to strengthen
                the behaviour evidence.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Gap Analysis Timeline</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Months 1-6:</strong> Create initial matrix framework. Begin populating with early evidence.
                  Identify which KSBs will be hardest to evidence given your workplace
                </li>
                <li className="pl-1">
                  <strong>Months 6-12:</strong> First formal gap analysis. Discuss coverage with training provider.
                  Plan activities to address gaps in knowledge and skills areas
                </li>
                <li className="pl-1">
                  <strong>Months 12-18:</strong> Quarterly gap reviews. Focus on behaviour evidence and
                  cross-referencing. Seek witness statements for activities already completed
                </li>
                <li className="pl-1">
                  <strong>3 months before EPA:</strong> Comprehensive review. All KSBs should have at least one
                  piece of evidence. Final push to close remaining gaps
                </li>
                <li className="pl-1">
                  <strong>1 month before EPA:</strong> Final check. Matrix should be complete. Focus shifts to
                  preparing to discuss evidence confidently
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Gap analysis is only useful if you act on the findings. Identifying a
              gap three months before the EPA gives you time to address it. Identifying it three days before
              does not.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Preparing Your Matrix for the Assessor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The final version of your mapping matrix should be clear, complete and easy to navigate. The
              assessor will use it as their primary tool for reviewing your portfolio and planning the
              professional discussion, so presentation matters.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Final Matrix Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Every KSB from the ST1426 standard is listed</li>
                <li className="pl-1">Every KSB has at least one piece of evidence mapped against it</li>
                <li className="pl-1">Evidence reference codes are consistent and match the actual portfolio documents</li>
                <li className="pl-1">Brief descriptions explain what each evidence item demonstrates for each KSB</li>
                <li className="pl-1">The matrix is clearly formatted and easy to read (printed or on screen)</li>
                <li className="pl-1">You can locate every referenced evidence item quickly when asked</li>
                <li className="pl-1">You can discuss every piece of evidence confidently and in detail</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Evidence Reference Code System</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Prefix</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Evidence Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">WL</td>
                      <td className="border border-white/10 px-3 py-2">Work Log / Activity Log</td>
                      <td className="border border-white/10 px-3 py-2">WL-01, WL-02, WL-03...</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RA</td>
                      <td className="border border-white/10 px-3 py-2">Reflective Account</td>
                      <td className="border border-white/10 px-3 py-2">RA-01, RA-02, RA-03...</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">WS</td>
                      <td className="border border-white/10 px-3 py-2">Witness Statement</td>
                      <td className="border border-white/10 px-3 py-2">WS-01, WS-02, WS-03...</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PH</td>
                      <td className="border border-white/10 px-3 py-2">Photographic Evidence</td>
                      <td className="border border-white/10 px-3 py-2">PH-01, PH-02, PH-03...</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CT</td>
                      <td className="border border-white/10 px-3 py-2">Certificate / Qualification</td>
                      <td className="border border-white/10 px-3 py-2">CT-01, CT-02, CT-03...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The mapping matrix is the navigational tool for your entire portfolio.
              A well-constructed matrix demonstrates not just that you have gathered evidence, but that you
              understand the standard's requirements and can organise your evidence to meet them — itself a
              demonstration of professional competence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Using Your Matrix in the Professional Discussion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The mapping matrix does not just serve as a preparation tool — it plays an active role during the
              professional discussion itself. The assessor will have reviewed your matrix before the discussion
              and will use it to plan their questioning strategy, focusing on areas where they need to verify
              competence.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">How the Assessor Uses Your Matrix</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Identifying discussion topics:</strong> The assessor selects activities from your matrix
                  that cover multiple KSBs, enabling efficient evidence verification
                </li>
                <li className="pl-1">
                  <strong>Probing weaker areas:</strong> KSBs with fewer evidence references may receive more
                  detailed questioning to confirm competence
                </li>
                <li className="pl-1">
                  <strong>Verifying cross-references:</strong> The assessor may ask you to explain how a single
                  activity demonstrates multiple KSBs to confirm genuine understanding
                </li>
                <li className="pl-1">
                  <strong>Checking authenticity:</strong> Questions about mapped evidence test whether you genuinely
                  performed the activities described, not just documented them
                </li>
                <li className="pl-1">
                  <strong>Distinguishing pass from distinction:</strong> Deeper follow-up questions on mapped
                  evidence assess whether your understanding goes beyond competent to exceptional
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Example Discussion Questions Triggered by the Matrix</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  "I can see you have mapped WL-04 to both S5 (fault diagnosis) and K12 (testing principles).
                  Can you explain how that activity demonstrates both?"
                </li>
                <li className="pl-1">
                  "Your matrix shows B4 (continuous improvement) is evidenced by RA-02. Tell me about the
                  improvement you suggested and what happened as a result."
                </li>
                <li className="pl-1">
                  "I notice S9 (commissioning) has only one piece of evidence. Can you describe any other
                  commissioning experience you have had?"
                </li>
                <li className="pl-1">
                  "Your evidence for K7 comes from a witness statement. Can you expand on the underpinning
                  knowledge that activity required?"
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Preparing for Matrix-Based Questions</p>
              <p className="text-sm text-white">
                Before the professional discussion, review every entry in your matrix and make sure you can
                explain: what the evidence is, how the activity demonstrates the mapped KSB(s), the
                underpinning knowledge behind your actions, what you would do differently with the benefit of
                experience, and how the activity demonstrates professional behaviours. If you cannot confidently
                discuss a mapped item, either strengthen the evidence or prepare additional talking points.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Your mapping matrix is your navigation chart for the professional
              discussion. Know it thoroughly — every reference, every cross-link, every KSB. The assessor
              will use it as their guide, so make sure you can follow the same map with confidence.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
          <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>
          <div className="p-4 rounded-lg bg-white/5">
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1">
                <strong>Start early:</strong> Create matrix framework from day one using the official ST1426 standard
              </li>
              <li className="pl-1">
                <strong>Cover everything:</strong> List every K, S and B — no exceptions
              </li>
              <li className="pl-1">
                <strong>Cross-reference:</strong> Map each evidence item to all KSBs it genuinely demonstrates
              </li>
              <li className="pl-1">
                <strong>Reference codes:</strong> Use consistent codes (WL-01, RA-01, WS-01, PH-01) for easy navigation
              </li>
              <li className="pl-1">
                <strong>Colour code:</strong> Green = strong, amber = adequate, red = gap needing attention
              </li>
              <li className="pl-1">
                <strong>Review regularly:</strong> Update at every progress meeting and when adding new evidence
              </li>
              <li className="pl-1">
                <strong>Gap analysis:</strong> Conduct formal review at 6 months, 12 months, and 3 months before EPA
              </li>
              <li className="pl-1">
                <strong>Discussion prep:</strong> Be ready to discuss every mapped evidence item confidently and in detail
              </li>
            </ul>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Evidence Mapping"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Logging Activities
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section3">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section3_4;
