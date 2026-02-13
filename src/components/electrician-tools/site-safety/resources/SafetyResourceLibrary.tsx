import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Download,
  FileText,
  BookOpen,
  File,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  useSafetyResources,
  type SafetyResource,
} from "@/hooks/useSafetyResources";
import { SafetyEmptyState } from "../common/SafetyEmptyState";
import { SafetySkeletonLoader } from "../common/SafetySkeletonLoader";

interface SafetyResourceLibraryProps {
  onBack: () => void;
}

const FILE_ICONS: Record<string, React.ElementType> = {
  pdf: FileText,
  document: BookOpen,
  spreadsheet: File,
};

export function SafetyResourceLibrary({ onBack }: SafetyResourceLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: resources, isLoading } = useSafetyResources(
    selectedCategory ?? undefined
  );

  const filtered = (resources ?? []).filter((r) =>
    searchTerm
      ? r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.summary.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  // Extract unique categories
  const categories = Array.from(
    new Set((resources ?? []).map((r) => r.category))
  ).sort();

  const handleDownload = (resource: SafetyResource) => {
    if (resource.file_url) {
      window.open(resource.file_url, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
        </div>
      </div>

      <div className="px-4 space-y-4 pb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Safety Resources
          </h2>
          <p className="text-sm text-white">
            Guidance notes, posters, and HSE publications
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white"
          />
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap touch-manipulation transition-all ${
                selectedCategory === null
                  ? "bg-elec-yellow text-black"
                  : "bg-white/[0.06] text-white border border-white/[0.08]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat ? null : cat
                  )
                }
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap touch-manipulation transition-all ${
                  selectedCategory === cat
                    ? "bg-elec-yellow text-black"
                    : "bg-white/[0.06] text-white border border-white/[0.08]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Resources list */}
        {isLoading ? (
          <SafetySkeletonLoader variant="list" />
        ) : filtered.length === 0 ? (
          <SafetyEmptyState
            icon={BookOpen}
            heading="No Resources Found"
            description={
              searchTerm
                ? `No resources match "${searchTerm}"`
                : "No safety resources available yet. Check back soon."
            }
          />
        ) : (
          <div className="space-y-2">
            {filtered.map((resource, index) => {
              const FileIcon =
                FILE_ICONS[resource.file_type] ?? FileText;

              return (
                <motion.button
                  key={resource.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDownload(resource)}
                  className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] transition-colors touch-manipulation"
                >
                  <div className="p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <FileIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[13px] font-semibold text-white truncate">
                        {resource.title}
                      </h3>
                      <p className="text-[11px] text-white line-clamp-1">
                        {resource.summary}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge className="bg-white/[0.06] text-white border-none text-[9px]">
                          {resource.category}
                        </Badge>
                        {resource.file_size && (
                          <span className="text-[9px] text-white">
                            {resource.file_size}
                          </span>
                        )}
                        {(resource.download_count ?? 0) > 0 && (
                          <span className="text-[9px] text-white flex items-center gap-0.5">
                            <Download className="h-2.5 w-2.5" />
                            {resource.download_count}
                          </span>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-white flex-shrink-0" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default SafetyResourceLibrary;
