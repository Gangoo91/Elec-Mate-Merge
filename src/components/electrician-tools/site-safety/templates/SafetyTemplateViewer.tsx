import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  FileText,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  useAdoptTemplate,
  type SafetyTemplate,
} from "@/hooks/useSafetyTemplates";

interface SafetyTemplateViewerProps {
  template: SafetyTemplate;
  onBack: () => void;
  isAdopted: boolean;
}

export function SafetyTemplateViewer({
  template,
  onBack,
  isAdopted,
}: SafetyTemplateViewerProps) {
  const [companyName, setCompanyName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const adoptMutation = useAdoptTemplate();

  const handleAdopt = () => {
    // Replace placeholders in content
    let content = template.content;
    content = content.replace(/\{\{company_name\}\}/g, companyName || "___");
    content = content.replace(/\{\{site_address\}\}/g, siteAddress || "___");
    content = content.replace(
      /\{\{date\}\}/g,
      new Date().toLocaleDateString("en-GB")
    );
    content = content.replace(
      /\{\{[a-z_]+\}\}/g,
      "___"
    );

    adoptMutation.mutate(
      {
        templateId: template.id,
        name: template.name,
        content,
        companyName: companyName || undefined,
        siteAddress: siteAddress || undefined,
      },
      { onSuccess: onBack }
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Templates</span>
          </button>
          {isAdopted && (
            <span className="flex items-center gap-1 text-green-400 text-xs font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Adopted
            </span>
          )}
        </div>
      </div>

      <div className="px-4 space-y-4 pb-8">
        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-5 w-5 text-elec-yellow" />
            <span className="text-xs text-white font-medium">
              {template.category}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{template.name}</h2>
          {template.summary && (
            <p className="text-sm text-white mt-1">{template.summary}</p>
          )}
        </div>

        {/* Regulatory references */}
        {template.regulatory_references.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {template.regulatory_references.map((ref) => (
              <span
                key={ref}
                className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full"
              >
                {ref}
              </span>
            ))}
          </div>
        )}

        {/* Preview */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 overflow-auto max-h-[400px]">
          <div
            className="prose prose-invert prose-sm max-w-none [&_h1]:text-lg [&_h1]:font-bold [&_h2]:text-base [&_h2]:font-semibold [&_h3]:text-sm [&_h3]:font-semibold [&_ul]:list-disc [&_ol]:list-decimal [&_li]:text-white [&_p]:text-white"
            dangerouslySetInnerHTML={{ __html: template.content }}
          />
        </div>

        {/* Adopt form */}
        {!isAdopted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 p-4 rounded-xl border border-elec-yellow/20 bg-elec-yellow/5"
          >
            <h3 className="text-sm font-bold text-white">
              Adopt This Template
            </h3>
            <p className="text-xs text-white">
              Fill in your details and the template will be personalised for you.
            </p>
            <Input
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white"
            />
            <Input
              placeholder="Site address"
              value={siteAddress}
              onChange={(e) => setSiteAddress(e.target.value)}
              className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white"
            />
            <button
              onClick={handleAdopt}
              disabled={adoptMutation.isPending}
              className="w-full h-11 rounded-xl bg-elec-yellow text-black font-semibold text-sm touch-manipulation active:scale-[0.97] active:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {adoptMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Adopting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Adopt Template
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SafetyTemplateViewer;
