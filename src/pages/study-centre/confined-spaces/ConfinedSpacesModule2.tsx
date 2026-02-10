import { ArrowLeft, Scale, ClipboardCheck, FileText, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Confined Spaces Regulations 1997",
    icon: Scale,
    description:
      "Regulations 1 to 5, the Approved Code of Practice L101, links to the Health and Safety at Work Act 1974, and the Management of Health and Safety at Work Regulations 1999",
  },
  {
    id: 2,
    title: "Risk Assessment for Confined Spaces",
    icon: ClipboardCheck,
    description:
      "Identifying confined spaces on site, assessing the hazards present, and applying the hierarchy: avoid entry, implement a safe system of work, arrange emergency procedures",
  },
  {
    id: 3,
    title: "Safe Systems of Work",
    icon: FileText,
    description:
      "Planning the work, supervision arrangements, competence requirements, communication protocols, equipment selection, and isolation procedures",
  },
  {
    id: 4,
    title: "Permit-to-Work Systems",
    icon: ShieldCheck,
    description:
      "When a permit to work is required, permit content and format, defined roles and responsibilities, permit lifecycle management, and hot work permits",
  },
];

export default function ConfinedSpacesModule2() {
  useSEO({
    title: "Module 2: Legislation & Risk Assessment | Confined Spaces Awareness",
    description:
      "Study the Confined Spaces Regulations 1997, risk assessment processes, safe systems of work, and permit-to-work systems for confined space entry.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../confined-spaces-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Confined Spaces
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
              <span className="text-cyan-400 text-xs font-semibold">MODULE 2</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Legislation & Risk Assessment
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Understand the legal framework governing confined space work in the UK, learn how to
              carry out a thorough risk assessment, implement safe systems of work, and manage
              permit-to-work procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../confined-spaces-module-2-section-${section.id}`}
                sectionNumber={section.id}
                title={section.title}
                description={section.description}
                icon={section.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
