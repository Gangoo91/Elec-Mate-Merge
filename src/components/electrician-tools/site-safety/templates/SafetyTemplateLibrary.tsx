import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  FileText,
  Shield,
  ClipboardCheck,
  Wrench,
  BookOpen,
  ChevronRight,
  FolderOpen,
  Edit3,
  Trash2,
  Pencil,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  useSafetyTemplates,
  useUserSafetyDocuments,
  type SafetyTemplate,
  type UserSafetyDocument,
} from "@/hooks/useSafetyTemplates";
import { SafetyTemplateViewer } from "./SafetyTemplateViewer";
import { SafetyTemplateEditor } from "./SafetyTemplateEditor";
import { SafetyEmptyState } from "../common/SafetyEmptyState";
import { SafetySkeletonLoader } from "../common/SafetySkeletonLoader";
import { SwipeableListItem } from "../common/SwipeableListItem";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SafetyTemplateLibraryProps {
  onBack: () => void;
}

type Tab = "browse" | "my-docs";

const CATEGORIES = [
  { key: "Risk Assessment", icon: Shield, colour: "text-red-400" },
  { key: "Method Statement", icon: FileText, colour: "text-blue-400" },
  { key: "Safe System of Work", icon: Wrench, colour: "text-amber-400" },
  { key: "Checklist", icon: ClipboardCheck, colour: "text-green-400" },
];

const STATUS_COLOUR: Record<string, string> = {
  Draft: "text-amber-400 bg-amber-500/10",
  Active: "text-green-400 bg-green-500/10",
  "Review Due": "text-orange-400 bg-orange-500/10",
  Archived: "text-white bg-white/[0.06]",
};

export function SafetyTemplateLibrary({ onBack }: SafetyTemplateLibraryProps) {
  const [tab, setTab] = useState<Tab>("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewingTemplate, setViewingTemplate] =
    useState<SafetyTemplate | null>(null);
  const [editingDocument, setEditingDocument] =
    useState<UserSafetyDocument | null>(null);

  const { data: templates, isLoading, refetch: refetchTemplates } = useSafetyTemplates(
    selectedCategory ?? undefined
  );
  const { data: userDocs, isLoading: userDocsLoading, refetch: refetchUserDocs } =
    useUserSafetyDocuments();
  const { toast } = useToast();

  const handleDeleteDocument = useCallback(async (docId: string) => {
    try {
      const { error } = await supabase
        .from("user_safety_documents")
        .delete()
        .eq("id", docId);
      if (error) throw error;
      toast({ title: "Document deleted", description: "Safety document has been removed" });
      refetchUserDocs();
    } catch (err) {
      console.error("Delete error:", err);
      toast({ title: "Error", description: "Could not delete document", variant: "destructive" });
    }
  }, [toast, refetchUserDocs]);

  const filtered = (templates ?? []).filter((t) =>
    searchTerm
      ? t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const filteredDocs = (userDocs ?? []).filter((d) =>
    searchTerm
      ? d.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const adoptedTemplateIds = new Set(
    (userDocs ?? []).map((d) => d.template_id).filter(Boolean)
  );

  const handleRefresh = useCallback(async () => {
    await Promise.all([refetchTemplates(), refetchUserDocs()]);
  }, [refetchTemplates, refetchUserDocs]);

  if (viewingTemplate) {
    return (
      <SafetyTemplateViewer
        template={viewingTemplate}
        onBack={() => setViewingTemplate(null)}
        isAdopted={adoptedTemplateIds.has(viewingTemplate.id)}
      />
    );
  }

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

      <PullToRefresh onRefresh={handleRefresh}>
      <div className="px-4 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Safety Templates
          </h2>
          <p className="text-sm text-white">
            UK electrical safety document templates ready to adopt and customise
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
          <button
            onClick={() => setTab("browse")}
            className={`flex-1 h-10 rounded-lg text-sm font-semibold touch-manipulation transition-all flex items-center justify-center gap-2 ${
              tab === "browse"
                ? "bg-elec-yellow text-black"
                : "text-white"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Browse
          </button>
          <button
            onClick={() => setTab("my-docs")}
            className={`flex-1 h-10 rounded-lg text-sm font-semibold touch-manipulation transition-all flex items-center justify-center gap-2 ${
              tab === "my-docs"
                ? "bg-elec-yellow text-black"
                : "text-white"
            }`}
          >
            <FolderOpen className="h-4 w-4" />
            My Documents
            {(userDocs ?? []).length > 0 && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  tab === "my-docs"
                    ? "bg-black/20 text-black"
                    : "bg-white/[0.1] text-white"
                }`}
              >
                {(userDocs ?? []).length}
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
          <Input
            placeholder={
              tab === "browse"
                ? "Search templates..."
                : "Search my documents..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
        {tab === "browse" ? (
          <>
            {/* Category filter */}
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
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat.key ? null : cat.key
                    )
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap touch-manipulation transition-all ${
                    selectedCategory === cat.key
                      ? "bg-elec-yellow text-black"
                      : "bg-white/[0.06] text-white border border-white/[0.08]"
                  }`}
                >
                  {cat.key}
                </button>
              ))}
            </div>

            {/* Templates list */}
            {isLoading ? (
              <SafetySkeletonLoader variant="card" />
            ) : filtered.length === 0 ? (
              <SafetyEmptyState
                icon={BookOpen}
                heading="No Templates Found"
                description={
                  searchTerm
                    ? `No templates match "${searchTerm}"`
                    : "No templates available in this category"
                }
              />
            ) : (
              <div className="space-y-2 pb-8">
                {filtered.map((template, index) => {
                  const catConfig = CATEGORIES.find(
                    (c) => c.key === template.category
                  );
                  const CatIcon = catConfig?.icon ?? FileText;
                  const isAdopted = adoptedTemplateIds.has(template.id);

                  return (
                    <motion.button
                      key={template.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setViewingTemplate(template)}
                      className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] transition-colors touch-manipulation"
                    >
                      <div className="p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                          <CatIcon
                            className={`h-5 w-5 ${catConfig?.colour ?? "text-white"}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-[13px] font-semibold text-white truncate">
                              {template.name}
                            </h3>
                            {isAdopted && (
                              <span className="text-[9px] font-bold text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded-full flex-shrink-0">
                                Adopted
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-white truncate">
                            {template.category}
                            {template.subcategory
                              ? ` · ${template.subcategory}`
                              : ""}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* My Documents tab */
          <>
            {userDocsLoading ? (
              <SafetySkeletonLoader variant="card" />
            ) : filteredDocs.length === 0 ? (
              <SafetyEmptyState
                icon={FolderOpen}
                heading={
                  searchTerm ? "No Documents Found" : "No Documents Yet"
                }
                description={
                  searchTerm
                    ? `No documents match "${searchTerm}"`
                    : "Adopt a template from the Browse tab to create your first safety document."
                }
              />
            ) : (
              <div className="space-y-2 pb-8">
                {filteredDocs.map((doc, index) => (
                  <SwipeableListItem
                    key={doc.id}
                    leftActions={[
                      {
                        icon: Pencil,
                        label: "Edit",
                        color: "bg-blue-500",
                        onAction: () => setEditingDocument(doc),
                      },
                    ]}
                    rightActions={[
                      {
                        icon: Trash2,
                        label: "Delete",
                        color: "bg-red-500",
                        onAction: () => handleDeleteDocument(doc.id),
                      },
                    ]}
                  >
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setEditingDocument(doc)}
                      className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] transition-colors touch-manipulation"
                    >
                      <div className="p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[13px] font-semibold text-white truncate">
                            {doc.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge
                              className={`border-none text-[9px] font-bold ${
                                STATUS_COLOUR[doc.status] ??
                                STATUS_COLOUR.Draft
                              }`}
                            >
                              {doc.status}
                            </Badge>
                            {doc.company_name && (
                              <span className="text-[10px] text-white truncate">
                                {doc.company_name}
                              </span>
                            )}
                          </div>
                        </div>
                        <Edit3 className="h-4 w-4 text-white flex-shrink-0" />
                      </div>
                    </motion.button>
                  </SwipeableListItem>
                ))}
              </div>
            )}
          </>
        )}
          </motion.div>
        </AnimatePresence>
      </div>
      </PullToRefresh>

      {/* Editor sheet */}
      {editingDocument && (
        <SafetyTemplateEditor
          open={!!editingDocument}
          onOpenChange={(open) => {
            if (!open) setEditingDocument(null);
          }}
          document={editingDocument}
          onSaved={() => setEditingDocument(null)}
        />
      )}
    </motion.div>
  );
}

export default SafetyTemplateLibrary;
