import { ArrowLeft, FileText, CheckCircle, AlertTriangle, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "hs-file-regulation",
    question:
      "Under which CDM 2015 regulation is the health and safety file required?",
    options: [
      "Regulation 4(1) — notification requirements",
      "Regulation 12(5) — principal designer duties",
      "Regulation 8(3) — general principles of prevention",
      "Regulation 15(2) — construction phase plan"
    ],
    correctIndex: 1,
    explanation:
      "The health and safety file is required under Regulation 12(5) of CDM 2015. The principal designer must prepare, review, update, and revise the H&S file during the pre-construction and construction phases, and ensure it is passed to the client at the end of the project."
  },
  {
    id: "hs-file-retention",
    question:
      "Who is responsible for retaining the health and safety file after a project is completed?",
    options: [
      "The principal designer",
      "The principal contractor",
      "The client",
      "The local authority building control"
    ],
    correctIndex: 2,
    explanation:
      "After the project is completed, the client is responsible for retaining the health and safety file. The client must keep it available for inspection by anyone who needs it for future construction work, and must pass it on if the property is sold or transferred."
  },
  {
    id: "hs-file-single-contractor",
    question:
      "On a single-contractor project with no principal designer, who must ensure the H&S file is prepared?",
    options: [
      "The client must prepare it themselves",
      "No file is required for single-contractor projects",
      "The contractor must ensure the file is prepared if applicable",
      "The CDM co-ordinator prepares it"
    ],
    correctIndex: 2,
    explanation:
      "On single-contractor projects where there is no principal designer, the contractor must ensure the health and safety file is prepared if it is applicable to the project. The approach should be proportionate to the scale and nature of the work."
  }
];

const faqs = [
  {
    question:
      "Is a health and safety file required for every construction project?",
    answer:
      "Not every project requires a health and safety file. Under CDM 2015, the file is required for projects that involve more than one contractor (i.e. where a principal designer is appointed), or where there is information that will be useful for future construction, maintenance, or demolition work. However, even on smaller single-contractor projects, if there is relevant health and safety information that would benefit future workers, it is good practice to compile a file. The key test is whether the information would be needed by anyone carrying out future construction work on the structure."
  },
  {
    question:
      "What is the difference between the health and safety file and the construction phase plan?",
    answer:
      "The construction phase plan is a document that manages health and safety during the construction phase itself — it deals with how the work will be carried out safely. It is prepared by the principal contractor (or sole contractor) before construction begins and is used during the project. The health and safety file, by contrast, is a document that records information needed after the project is completed. It contains as-built information, residual hazards, and maintenance details that future designers, contractors, and building occupiers will need. The construction phase plan is a live working document; the health and safety file is a legacy document that outlives the project."
  },
  {
    question:
      "Can the health and safety file be electronic or does it have to be on paper?",
    answer:
      "The health and safety file can be in any format — paper, electronic, or a combination. There is no legal requirement for a specific format. Many modern projects use electronic files, sometimes integrated with Building Information Modelling (BIM) systems. The key requirement is that the file must be accessible to anyone who needs it. If an electronic format is used, the client must ensure that future users can access it, that file formats remain readable over time, and that appropriate backup and version control systems are in place. For BIM-integrated projects, the H&S file information may be embedded within the model data."
  },
  {
    question:
      "What happens to the health and safety file when a building is sold?",
    answer:
      "When a property or structure is sold or transferred to a new owner, the existing client must pass the health and safety file to the new owner. This is a legal duty under CDM 2015. The new owner then becomes the dutyholder responsible for retaining and making the file available. If the file has been lost or was never prepared, the new owner should be made aware of this gap. In practice, H&S files are often lost during property transfers, which is one of the most common failings identified by the HSE. Solicitors and property managers should be made aware of the file during conveyancing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the primary purpose of the health and safety file under CDM 2015?",
    options: [
      "To record all accidents and incidents during construction",
      "To contain information needed for future construction work, maintenance, cleaning, refurbishment, and demolition",
      "To provide evidence of compliance with building regulations",
      "To serve as a contract document between client and contractor"
    ],
    correctAnswer: 1,
    explanation:
      "The health and safety file is a document containing information likely to be needed for future construction work, including maintenance, cleaning, refurbishment, and demolition. It is a legacy document that ensures future workers have the information they need to carry out work safely on the structure."
  },
  {
    id: 2,
    question:
      "Who is responsible for preparing the health and safety file during the project?",
    options: [
      "The client",
      "The principal contractor",
      "The principal designer",
      "The CDM co-ordinator"
    ],
    correctAnswer: 2,
    explanation:
      "Under CDM 2015, the principal designer (PD) is responsible for preparing, reviewing, updating, and revising the health and safety file during the pre-construction and construction phases. The PD must ensure the file is passed to the client at the end of the project."
  },
  {
    id: 3,
    question:
      "Which of the following should be included in the H&S file for an electrical installation?",
    options: [
      "Names and addresses of all workers on site",
      "Distribution board schedules and cable routes",
      "Daily site diary entries",
      "Tender prices from subcontractors"
    ],
    correctAnswer: 1,
    explanation:
      "The H&S file should include distribution board schedules, cable routes (especially hidden or embedded cables), isolation procedures, test certificates, earthing arrangements, and lightning protection details. Personal worker information and commercial data are not appropriate for the H&S file."
  },
  {
    id: 4,
    question:
      "What must the client do with the health and safety file after the project is completed?",
    options: [
      "Return it to the principal designer for archiving",
      "Submit it to the HSE within 28 days",
      "Retain it and make it available to anyone who needs it for future work",
      "Destroy it after five years in line with data retention policies"
    ],
    correctAnswer: 2,
    explanation:
      "The client must retain the health and safety file and make it available to anyone who needs the information for future construction work — including future designers, contractors, and building managers. There is no expiry date; the file must be kept for the life of the structure."
  },
  {
    id: 5,
    question:
      "On a single-contractor project with no principal designer, what happens regarding the H&S file?",
    options: [
      "No health and safety file is required under any circumstances",
      "The client must prepare the file themselves",
      "The contractor must ensure the file is prepared if applicable",
      "The HSE will prepare the file as part of their inspection"
    ],
    correctAnswer: 2,
    explanation:
      "On single-contractor projects where there is no principal designer, the contractor takes on the duty to ensure the health and safety file is prepared if it is applicable to the project. The approach should be proportionate to the scale and complexity of the work."
  },
  {
    id: 6,
    question:
      "Which of the following is a common failing identified by the HSE regarding health and safety files?",
    options: [
      "Files being too detailed and specific",
      "Files being delivered too early in the project",
      "Generic content that is not project-specific",
      "Files being retained by the client for too long"
    ],
    correctAnswer: 2,
    explanation:
      "One of the most common failings is generic content that is not project-specific. H&S files that contain only standard boilerplate text, manufacturer brochures, or generic risk assessments provide no real value to future users. The content must be specific to the actual structure and the actual work carried out."
  },
  {
    id: 7,
    question:
      "Why is it important to include cable route information (especially hidden or embedded cables) in the H&S file?",
    options: [
      "To allow the client to claim insurance on the cable installation",
      "To enable future workers to avoid striking or damaging cables during maintenance or refurbishment",
      "To verify that the correct cable sizes were used during installation",
      "To calculate the value of the electrical installation for resale"
    ],
    correctAnswer: 1,
    explanation:
      "Recording cable routes — especially those that are hidden within walls, floors, or ceilings — is critical because future workers carrying out maintenance, refurbishment, or demolition need to know where cables are located to avoid striking them. Hitting a live cable can cause electric shock, burns, arc flash, or fire."
  },
  {
    id: 8,
    question:
      "What should happen to the health and safety file when a property is sold or transferred?",
    options: [
      "The file should be archived by the original client's solicitor",
      "The file must be passed to the new owner, who becomes the new dutyholder",
      "The file is no longer required once the property changes hands",
      "The local authority retains the file on behalf of the new owner"
    ],
    correctAnswer: 1,
    explanation:
      "When a property is sold or transferred, the health and safety file must be passed to the new owner. The new owner then becomes the dutyholder responsible for retaining the file and making it available. This is a legal requirement under CDM 2015. Loss of the file during property transfers is one of the most common failings identified by the HSE."
  }
];

export default function CdmRegulationsModule3Section3() {
  useSEO({
    title:
      "Health & Safety File | CDM Regulations Module 3.3",
    description:
      "Regulation 12(5) health and safety file — content, preparation, handover, client duties, electrical information requirements, and common failings."
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
            <Link to="../cdm-regulations-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/20 border border-blue-500/30 mb-4">
            <FileText className="h-7 w-7 text-blue-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3 mx-auto">
            <span className="text-blue-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Health &amp; Safety File
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The legacy document that protects future workers &mdash; what it
            contains, who prepares it, and why it matters for every electrical
            project
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>What:</strong> Document containing info for future
                construction work
              </li>
              <li>
                <strong>Who:</strong> PD prepares it; client retains it
              </li>
              <li>
                <strong>When:</strong> Compiled during the project, handed over
                at the end
              </li>
              <li>
                <strong>Why:</strong> Protects anyone working on the structure in
                the future
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Regulation:</strong> CDM 2015, Regulation 12(5)
              </li>
              <li>
                <strong>Electrical:</strong> Board schedules, cable routes, test
                certs
              </li>
              <li>
                <strong>Handover:</strong> PD passes file to client at project
                end
              </li>
              <li>
                <strong>Retention:</strong> Client keeps it for the life of the
                structure
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
              "Explain the purpose of the health and safety file under CDM 2015",
              "Identify who is responsible for preparing, reviewing, and retaining the file",
              "List the key content that should be included in a health and safety file",
              "Describe the electrical information that must be recorded for future workers",
              "Explain what happens on single-contractor projects with no principal designer",
              "Identify the most common failings and how to avoid them"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-blue-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is the H&S File? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">01</span>
            What Is the Health &amp; Safety File?
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Regulation 12(5) &mdash; CDM 2015
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The health and safety file is a document containing information
                  likely to be needed to ensure health and safety during any
                  subsequent construction work on the structure. It is a{" "}
                  <strong className="text-white">legacy document</strong> &mdash;
                  it outlives the project and serves future workers who may
                  carry out maintenance, cleaning, refurbishment, or demolition.
                </p>
              </div>

              <p>
                The H&S file is not a record of what happened during the
                construction phase. It is not a daily diary, an accident log, or
                a contract document. Its sole purpose is to provide{" "}
                <strong>
                  information that future designers, contractors, and building
                  managers will need
                </strong>{" "}
                to plan and carry out work safely on the completed structure.
              </p>

              <p>
                Think of it as a{" "}
                <strong>
                  user manual for the building&rsquo;s health and safety
                </strong>
                . Just as a car comes with a handbook explaining how to maintain
                it safely, a completed construction project should come with a
                health and safety file explaining what future workers need to
                know.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The File Covers Future Work Including:
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Maintenance</strong> &mdash;
                      routine servicing, inspection, repair
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cleaning</strong> &mdash;
                      window cleaning, facade access, confined spaces
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Refurbishment</strong>{" "}
                      &mdash; alterations, fit-out, conversion
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Demolition</strong> &mdash;
                      partial or full demolition, structural changes
                    </span>
                  </div>
                </div>
              </div>

              <p>
                The file is required under{" "}
                <strong>Regulation 12(5) of CDM 2015</strong>. It applies to all
                projects where a principal designer is appointed (i.e. projects
                with more than one contractor). Even on smaller projects, it is
                good practice to compile relevant health and safety information
                for future reference.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Who Prepares It? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">02</span>
            Who Prepares It?
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>principal designer (PD)</strong> is responsible for
                the health and safety file. This responsibility begins during
                the pre-construction phase and continues throughout the
                construction phase until the file is handed over to the client.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Principal Designer&rsquo;s File Duties
                </p>
                <ol className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">
                        Prepare the file during pre-construction
                      </strong>{" "}
                      &mdash; establish the structure and begin populating it
                      with relevant design information as early as possible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Review and update during construction
                      </strong>{" "}
                      &mdash; as the project progresses, update the file with
                      as-built information, any design changes, and contractor
                      contributions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Revise as necessary
                      </strong>{" "}
                      &mdash; if significant changes occur during construction
                      that affect the as-built condition, the file must be
                      revised to reflect reality
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        Pass the file to the client at project end
                      </strong>{" "}
                      &mdash; the completed file must be handed over to the
                      client, who then becomes the dutyholder responsible for its
                      retention
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">Important:</strong> The
                  principal designer does not have to write every part of the
                  file themselves. They must <strong>ensure</strong> the file is
                  prepared &mdash; this means gathering information from
                  designers, contractors, and specialist subcontractors. The PD
                  co-ordinates the contributions and ensures the file is
                  complete, accurate, and useful.
                </p>
              </div>

              <p>
                Contractors and subcontractors have a duty to co-operate with
                the PD and provide information for the file. For electrical
                installations, the electrical contractor should provide as-built
                drawings, test certificates, cable route information, and details
                of any residual hazards. This information should be provided in
                good time, not rushed at the end of the project.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  After Handover
                </p>
                <p className="text-sm text-white/80">
                  Once the file has been passed to the client, the{" "}
                  <strong className="text-white">
                    client retains it and makes it available
                  </strong>{" "}
                  to anyone who needs the information for future work. The
                  client must keep the file up to date if further work is
                  carried out on the structure. The client&rsquo;s duty does not
                  end when the contractor leaves site.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Content */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">03</span>
            Content of the Health &amp; Safety File
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The content of the health and safety file should be{" "}
                <strong>proportionate</strong> to the nature and scale of the
                project. A small domestic extension will require a simpler file
                than a major commercial development. However, the information
                must always be <strong>specific to the actual project</strong>{" "}
                &mdash; generic boilerplate content is not acceptable.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Content Categories
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        As-built drawings
                      </strong>{" "}
                      &mdash; showing the actual constructed condition, not just
                      the original design intent. These must reflect any changes
                      made during construction
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Design criteria</strong>{" "}
                      &mdash; the basis on which the design was developed,
                      including assumptions, load calculations, and design
                      standards applied
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        General structure details
                      </strong>{" "}
                      &mdash; structural form, foundations, load-bearing
                      elements, pre-stressed or post-tensioned components
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Building services details
                      </strong>{" "}
                      &mdash; electrical, mechanical, and plumbing systems
                      including their layout, capacity, and isolation points
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Materials used</strong>{" "}
                      &mdash; particularly any hazardous materials (asbestos,
                      lead paint, treated timber) and their locations within the
                      structure
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Maintenance procedures
                      </strong>{" "}
                      &mdash; details of how building elements and services
                      should be safely maintained, accessed, and serviced
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Residual hazards and risks
                      </strong>{" "}
                      &mdash; any hazards that could not be designed out and
                      remain in the completed structure, including information on
                      how they have been managed
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">
                    The Proportionality Principle:
                  </strong>{" "}
                  The file should contain only information that is{" "}
                  <strong>useful</strong> for future health and safety. It is not
                  a dumping ground for every project document. A well-organised,
                  concise file that contains relevant information is far more
                  valuable than a bulky file packed with irrelevant paperwork
                  that no one will ever read.
                </p>
              </div>

              <p>
                For electrical installations, the building services section is
                particularly important. Future electricians carrying out
                maintenance, alterations, or fault-finding will need accurate,
                up-to-date information about the electrical systems. This is
                covered in detail in the next section.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Electrical Information in H&S Files */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">04</span>
            Electrical Information in H&amp;S Files
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Critical for Electrical Safety
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Electrical information is one of the most important components
                  of the health and safety file. Future electricians carrying out
                  maintenance, fault-finding, alterations, or testing need
                  accurate information about the electrical installation to work
                  safely. Incomplete or missing electrical information in the
                  H&S file is a significant risk to future workers.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Electrical Information That Should Be Included
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-blue-400">
                      Distribution Board Schedules
                    </p>
                    <p className="text-white/70 text-xs">
                      Circuit identification, protective device ratings, cable
                      sizes, load distribution across all boards
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-blue-400">
                      Cable Routes
                    </p>
                    <p className="text-white/70 text-xs">
                      Especially hidden or embedded cables &mdash; within walls,
                      floors, ceilings, and underground. Critical for avoiding
                      cable strikes
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-blue-400">
                      Isolation Procedures
                    </p>
                    <p className="text-white/70 text-xs">
                      Location of isolation points, switching sequences for
                      complex systems, interlocks and safety systems
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-blue-400">
                      Test Certificates
                    </p>
                    <p className="text-white/70 text-xs">
                      Initial verification certificates (BS 7671), periodic
                      inspection schedules, test results as a baseline
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-blue-400">
                      Earthing Arrangements
                    </p>
                    <p className="text-white/70 text-xs">
                      Type of earthing system (TN-S, TN-C-S, TT), main earthing
                      terminal location, bonding conductor routes
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-blue-400">
                      Lightning Protection
                    </p>
                    <p className="text-white/70 text-xs">
                      Lightning protection system details, down conductor
                      routes, test point locations, maintenance requirements
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Hidden or embedded cables are a particular concern. When cables
                are buried within walls, cast into concrete floors, or run
                through inaccessible voids, there is no way for future workers
                to know where they are without accurate records. A future
                electrician drilling into a wall to install a new socket could
                strike a concealed cable if its route is not recorded in the H&S
                file.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Why This Matters
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Cable strikes are one of the most common causes of electrical
                  injury on construction and maintenance sites. Many cable
                  strikes occur because workers did not know where cables were
                  located. Accurate cable route information in the H&S file can
                  prevent these incidents. As an electrical contractor, you have
                  a duty to provide this information for inclusion in the file.
                </p>
              </div>

              <p>
                Isolation procedures are equally important. Complex electrical
                systems &mdash; particularly in commercial and industrial
                buildings &mdash; may have multiple sources of supply,
                interlocks, standby generators, and UPS systems. A future
                electrician needs to know the{" "}
                <strong>complete isolation procedure</strong> for each part of
                the installation, not just the location of the main switch.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: When There Is No PD */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">05</span>
            When There Is No Principal Designer
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not every project requires a principal designer. Under CDM 2015,
                a PD is only required when there is{" "}
                <strong>more than one contractor</strong> working on the project.
                On <strong>single-contractor projects</strong>, the duties that
                would normally fall to the PD are either absorbed by the
                contractor or, in some cases, by the client.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Single-Contractor Projects
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Contractor takes on PD file duties
                      </strong>{" "}
                      &mdash; the contractor must ensure the health and safety
                      file is prepared if it is applicable to the project
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Proportionate approach
                      </strong>{" "}
                      &mdash; the file should be proportionate to the scale and
                      nature of the work. A small domestic rewire does not need
                      the same level of documentation as a hospital refurbishment
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Not always required
                      </strong>{" "}
                      &mdash; if there is no information that would be useful for
                      future construction work, a file may not be necessary. But
                      consider carefully before deciding a file is not needed
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">
                    Practical Example &mdash; Domestic Rewire:
                  </strong>{" "}
                  A sole-trader electrician carrying out a full domestic rewire
                  is a single-contractor project. Even without a PD, it would be
                  good practice to provide the homeowner with a simple H&S file
                  containing as-built cable route drawings, distribution board
                  schedules, test certificates, and details of any concealed
                  wiring. This information could be invaluable to any future
                  electrician working on the property.
                </p>
              </div>

              <p>
                The key question is always:{" "}
                <strong>
                  &ldquo;Is there information about this project that someone
                  carrying out future work would need to know to do so
                  safely?&rdquo;
                </strong>{" "}
                If the answer is yes, a health and safety file (or at least the
                relevant information) should be compiled and passed to the
                client, regardless of whether a PD was appointed.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Format & Accessibility */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">06</span>
            Format &amp; Accessibility
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 does not prescribe a specific format for the health and
                safety file. It can be{" "}
                <strong>paper, electronic, or a combination</strong>. The format
                should be chosen based on what will be most accessible and
                useful for future users of the information.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Format Options
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-blue-400">
                      Paper Format
                    </p>
                    <p className="text-white/70 text-xs">
                      Traditional ring-binder approach. Simple, no technology
                      required to access. Risk of loss, damage, or degradation
                      over time. Difficult to update.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-blue-400">
                      Electronic Format
                    </p>
                    <p className="text-white/70 text-xs">
                      PDF documents, shared drives, cloud storage. Easy to
                      distribute and backup. Requires technology to access. File
                      formats may become obsolete.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-blue-400">
                      BIM Integration
                    </p>
                    <p className="text-white/70 text-xs">
                      H&S file information embedded within the Building
                      Information Model. Allows spatial referencing. Requires BIM
                      software to access.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-blue-400">
                      Hybrid Approach
                    </p>
                    <p className="text-white/70 text-xs">
                      Combination of paper summary and electronic detailed
                      records. Provides immediate access to key information with
                      detailed backup available digitally.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Regardless of format, the file must be{" "}
                <strong>clearly indexed</strong> so that future users can
                quickly find the information they need. A poorly organised file
                &mdash; even one containing excellent information &mdash; is of
                limited value if nobody can find what they are looking for.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Accessibility Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Clear indexing</strong>{" "}
                      &mdash; logical sections, table of contents, labelled
                      drawings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Version control</strong>{" "}
                      &mdash; clearly dated revisions so users know they are
                      looking at the most current information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Accessible to future users
                      </strong>{" "}
                      &mdash; stored in a known location, formats that remain
                      readable over time, backup copies maintained
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Usable without specialist knowledge
                      </strong>{" "}
                      &mdash; the file should be understandable to a competent
                      person, not just the original designer
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">BIM Note:</strong> On
                  projects using Building Information Modelling, the H&S file
                  information can be embedded within the model as metadata
                  attached to building elements. This allows future users to
                  click on an element (such as a distribution board or cable
                  route) and access the relevant H&S information directly. This
                  is increasingly common on larger projects and is considered
                  best practice where BIM is being used.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Client Duties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">07</span>
            Client Duties Regarding the H&amp;S File
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Once the principal designer has handed over the completed health
                and safety file, the{" "}
                <strong>client becomes the dutyholder</strong>. The client&rsquo;s
                responsibilities regarding the file are ongoing &mdash; they do
                not end when the project is finished.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Client&rsquo;s Legal Duties
                </p>
                <ol className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">Retain the file</strong>{" "}
                      &mdash; the client must keep the health and safety file in
                      a safe, accessible location for the life of the structure.
                      There is no expiry date
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Make it available to anyone who needs it
                      </strong>{" "}
                      &mdash; future designers, contractors, building managers,
                      and anyone carrying out construction work on the structure
                      must be given access to the file
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">Keep it updated</strong>{" "}
                      &mdash; when further construction work is carried out on
                      the structure, the file must be updated to reflect the
                      changes. New information must be added and outdated
                      information revised
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        Pass it on if the property is sold or transferred
                      </strong>{" "}
                      &mdash; the file must be passed to the new owner, who then
                      becomes the new dutyholder. This applies whether the
                      property is sold, leased, or otherwise transferred
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Common Problem &mdash; Clients Not Aware of Their Duties
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Many clients &mdash; particularly domestic clients and small
                  commercial clients &mdash; are not aware of their duty to
                  retain and make available the health and safety file. The
                  principal designer or contractor should{" "}
                  <strong className="text-white">
                    explain these duties clearly
                  </strong>{" "}
                  when handing over the file. It is good practice to include a
                  cover letter or front page in the file itself that explains
                  what the file is, why it matters, and what the client must do
                  with it.
                </p>
              </div>

              <p>
                The obligation to make the file available is particularly
                important for electrical work. If a future electrician is called
                to carry out work on the building, they should be able to
                request the H&S file and obtain information about the existing
                electrical installation &mdash; cable routes, isolation
                procedures, distribution board schedules, and any residual
                hazards. A client who cannot provide this information is failing
                in their legal duty.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">
                    Property Transfers:
                  </strong>{" "}
                  When a building changes hands, the H&S file should be treated
                  as part of the property documentation &mdash; like title
                  deeds, planning consents, and building control certificates.
                  Solicitors and conveyancers should be made aware of the
                  file&rsquo;s existence and ensure it is transferred as part of
                  the sale process. In practice, this is an area where many
                  files are lost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Common Failings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">08</span>
            Common Failings
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    HSE-Identified Failings
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The Health and Safety Executive has consistently identified
                  significant failings in the preparation, quality, and
                  management of health and safety files across the construction
                  industry. These failings undermine the protection that the
                  file is supposed to provide to future workers.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Files not prepared at all
                      </strong>{" "}
                      &mdash; on many projects, no health and safety file is
                      compiled, despite the legal requirement. The file is often
                      seen as a low priority compared to programme and cost
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Poor quality content
                      </strong>{" "}
                      &mdash; files that contain irrelevant information,
                      manufacturer brochures, or padded-out content that
                      provides no real value to future users
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Not passed to the client
                      </strong>{" "}
                      &mdash; files that are compiled but never formally handed
                      over to the client, or handed over without explanation of
                      the client&rsquo;s duties
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Not kept up to date
                      </strong>{" "}
                      &mdash; files that are accurate at handover but never
                      updated when subsequent work is carried out on the
                      structure
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Generic content, not project-specific
                      </strong>{" "}
                      &mdash; boilerplate templates filled in with generic
                      information that could apply to any project, rather than
                      specific details about the actual structure
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">
                      &times;
                    </span>
                    <span>
                      <strong className="text-white">
                        Lost during property transfers
                      </strong>{" "}
                      &mdash; files that are not passed on when a property is
                      sold or transferred, leaving the new owner (and future
                      workers) without critical safety information
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    How to Get It Right
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">
                      &#10003;
                    </span>
                    <span>
                      <strong className="text-white">
                        Start the file early
                      </strong>{" "}
                      &mdash; begin compiling information during the design
                      phase, not as an afterthought at the end of the project
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">
                      &#10003;
                    </span>
                    <span>
                      <strong className="text-white">
                        Make it project-specific
                      </strong>{" "}
                      &mdash; every piece of information in the file should
                      relate directly to the actual structure and the actual work
                      carried out
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">
                      &#10003;
                    </span>
                    <span>
                      <strong className="text-white">
                        Include as-built information
                      </strong>{" "}
                      &mdash; designs change during construction. The file must
                      reflect what was actually built, not what was originally
                      designed
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">
                      &#10003;
                    </span>
                    <span>
                      <strong className="text-white">
                        Hand over formally
                      </strong>{" "}
                      &mdash; ensure the client understands what the file is and
                      what they must do with it. Document the handover
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">
                      &#10003;
                    </span>
                    <span>
                      <strong className="text-white">
                        Think about the future user
                      </strong>{" "}
                      &mdash; ask yourself: &ldquo;If I were an electrician
                      coming to this building in 20 years, what would I need to
                      know?&rdquo;
                    </span>
                  </div>
                </div>
              </div>

              <p>
                The health and safety file is often described as the most
                neglected document in construction. This is a significant failing
                because the file is the one document that is specifically
                designed to protect workers who have not yet arrived on site
                &mdash; people who may not even be in the industry yet. Getting
                the file right is an investment in{" "}
                <strong>future safety</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Diagram 1: H&S File Content Checklist */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">&mdash;</span>
            H&amp;S File Content Checklist
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
            <p className="text-sm font-medium text-blue-400 mb-4 text-center">
              Health &amp; Safety File &mdash; Content Checklist
            </p>
            <div className="relative mx-auto max-w-lg">
              {/* Outer file container */}
              <div className="border-2 border-blue-500/40 rounded-lg bg-[#1a1a1a] p-4">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-blue-500/20 border border-blue-500/30">
                    <ClipboardList className="h-4 w-4 text-blue-400" />
                    <span className="text-xs font-bold text-blue-400">
                      HEALTH &amp; SAFETY FILE
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    {
                      label: "As-Built Drawings",
                      detail: "Actual constructed condition"
                    },
                    {
                      label: "Design Criteria",
                      detail: "Assumptions, calculations, standards"
                    },
                    {
                      label: "Structural Details",
                      detail: "Foundations, load-bearing elements"
                    },
                    {
                      label: "Building Services",
                      detail: "Electrical, mechanical, plumbing"
                    },
                    {
                      label: "Materials Used",
                      detail: "Especially hazardous materials"
                    },
                    {
                      label: "Maintenance Procedures",
                      detail: "Safe access, servicing requirements"
                    },
                    {
                      label: "Residual Hazards",
                      detail: "Risks that could not be designed out"
                    },
                    {
                      label: "Electrical Records",
                      detail: "DB schedules, cable routes, test certs"
                    }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 rounded bg-white/5 border border-white/10"
                    >
                      <div className="w-5 h-5 rounded border-2 border-blue-500/60 bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-white">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-white/50 ml-2">
                          {item.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-white/10 pt-3">
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-[10px] text-white/50">
                      All content must be project-specific, not generic
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram 2: H&S File Lifecycle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">&mdash;</span>
            H&amp;S File Lifecycle
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
            <p className="text-sm font-medium text-blue-400 mb-4 text-center">
              Creation &rarr; Handover &rarr; Maintenance &rarr; Future Use
            </p>
            <div className="relative mx-auto max-w-lg">
              <div className="space-y-3">
                {/* Phase 1: Creation */}
                <div className="border-2 border-blue-500/50 rounded-lg bg-blue-500/10 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-blue-500/30 border border-blue-500/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-400">1</span>
                    </div>
                    <span className="text-sm font-medium text-blue-400">
                      Creation
                    </span>
                  </div>
                  <div className="ml-9 text-xs text-white/70 space-y-1">
                    <p>PD establishes file structure during pre-construction</p>
                    <p>
                      Designers &amp; contractors contribute as-built
                      information
                    </p>
                    <p>PD reviews, updates, and revises throughout the project</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-blue-500/40" />
                </div>

                {/* Phase 2: Handover */}
                <div className="border-2 border-blue-400/50 rounded-lg bg-blue-400/10 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-blue-400/30 border border-blue-400/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-400">2</span>
                    </div>
                    <span className="text-sm font-medium text-blue-400">
                      Handover
                    </span>
                  </div>
                  <div className="ml-9 text-xs text-white/70 space-y-1">
                    <p>PD passes completed file to the client at project end</p>
                    <p>
                      Client&rsquo;s duties are explained (retain, make
                      available, update)
                    </p>
                    <p>Formal handover is documented</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-blue-500/40" />
                </div>

                {/* Phase 3: Maintenance */}
                <div className="border-2 border-blue-300/50 rounded-lg bg-blue-300/10 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-blue-300/30 border border-blue-300/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-300">3</span>
                    </div>
                    <span className="text-sm font-medium text-blue-300">
                      Maintenance
                    </span>
                  </div>
                  <div className="ml-9 text-xs text-white/70 space-y-1">
                    <p>Client retains the file for the life of the structure</p>
                    <p>Updated when further construction work is carried out</p>
                    <p>Passed to new owner if property is sold or transferred</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-blue-500/40" />
                </div>

                {/* Phase 4: Future Use */}
                <div className="border-2 border-green-500/50 rounded-lg bg-green-500/10 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-green-500/30 border border-green-500/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-green-400">4</span>
                    </div>
                    <span className="text-sm font-medium text-green-400">
                      Future Use
                    </span>
                  </div>
                  <div className="ml-9 text-xs text-white/70 space-y-1">
                    <p>Future designers use it to plan safe new work</p>
                    <p>
                      Future contractors use it to identify hazards before
                      starting
                    </p>
                    <p>Building managers use it for safe maintenance planning</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 border-2 border-blue-500/50 bg-blue-500/10 rounded-sm" />
                  <span className="text-[10px] text-white/60">
                    PD Responsibility
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 border-2 border-blue-300/50 bg-blue-300/10 rounded-sm" />
                  <span className="text-[10px] text-white/60">
                    Client Responsibility
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 border-2 border-green-500/50 bg-green-500/10 rounded-sm" />
                  <span className="text-[10px] text-white/60">
                    Future Benefit
                  </span>
                </div>
              </div>
            </div>
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Client Duties
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-3-section-4">
              Next: Worker Engagement &amp; Consultation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
