import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Save,
  X,
  Eye,
  Edit3,
  Loader2,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUpdateBriefingContent, type Briefing } from "@/hooks/useBriefings";
import { sanitizeHtmlSafe } from "@/utils/inputSanitization";
import { useToast } from "@/hooks/use-toast";

interface BriefingEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefing: Briefing;
  onSaved?: () => void;
}

const DRAFT_KEY_PREFIX = "briefing-editor-draft-";

export function BriefingEditor({
  open,
  onOpenChange,
  briefing,
  onSaved,
}: BriefingEditorProps) {
  const { toast } = useToast();
  const [isPreview, setIsPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updateContent = useUpdateBriefingContent();

  const draftKey = `${DRAFT_KEY_PREFIX}${briefing.id}`;

  // Initialize editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your briefing content...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: briefing.content || "",
    onUpdate: ({ editor }) => {
      setHasChanges(true);
      // Auto-save draft
      localStorage.setItem(draftKey, editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-invert prose-sm max-w-none",
          "min-h-[300px] p-4 focus:outline-none",
          "prose-headings:text-white prose-headings:font-semibold",
          "prose-p:text-white/80 prose-p:leading-relaxed",
          "prose-li:text-white/80",
          "prose-strong:text-white prose-strong:font-semibold",
          "prose-em:text-white/90",
          "prose-table:border-collapse",
          "[&_table]:w-full [&_td]:py-1 [&_td]:pr-4 [&_th]:py-1 [&_th]:pr-4"
        ),
      },
    },
  });

  // Load draft on mount
  useEffect(() => {
    if (editor) {
      const draft = localStorage.getItem(draftKey);
      if (draft && draft !== briefing.content) {
        // Ask user if they want to restore draft
        const useDraft = window.confirm(
          "You have unsaved changes from a previous session. Would you like to restore them?"
        );
        if (useDraft) {
          editor.commands.setContent(draft);
          setHasChanges(true);
        } else {
          localStorage.removeItem(draftKey);
          editor.commands.setContent(briefing.content || "");
        }
      } else {
        editor.commands.setContent(briefing.content || "");
      }
    }
  }, [editor, briefing.content, draftKey]);

  // Clear draft on close without saving
  const handleClose = useCallback(() => {
    if (hasChanges) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to close?"
      );
      if (!confirmClose) return;
    }
    localStorage.removeItem(draftKey);
    onOpenChange(false);
  }, [hasChanges, draftKey, onOpenChange]);

  // Save briefing
  const handleSave = async () => {
    if (!editor) return;

    try {
      // Sanitise HTML before saving
      const sanitisedContent = sanitizeHtmlSafe(editor.getHTML());

      await updateContent.mutateAsync({
        id: briefing.id,
        content: sanitisedContent,
      });

      // Clear draft
      localStorage.removeItem(draftKey);
      setHasChanges(false);

      toast({
        title: "Briefing saved",
        description: "Your changes have been saved successfully.",
      });

      onSaved?.();
      onOpenChange(false);
    } catch {
      // Error handled by mutation
    }
  };

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
    disabled,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
    disabled?: boolean;
  }) => (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={cn(
        "h-11 w-11 p-0 rounded-lg touch-manipulation",
        isActive
          ? "bg-elec-yellow/20 text-elec-yellow"
          : "text-white/60 hover:text-white hover:bg-white/10"
      )}
    >
      {children}
    </Button>
  );

  // Get risk level styling
  const riskColour = briefing.risk_level === "high"
    ? "text-red-400 border-red-500/50"
    : briefing.risk_level === "medium"
    ? "text-amber-400 border-amber-500/50"
    : "text-green-400 border-green-500/50";

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 pb-3 border-b border-border shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/20">
                  <Edit3 className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <SheetTitle className="text-left">{briefing.title}</SheetTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {briefing.briefing_type || "Briefing"}
                    </Badge>
                    {briefing.risk_level && (
                      <Badge variant="outline" className={cn("text-xs", riskColour)}>
                        {briefing.risk_level === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {briefing.risk_level.charAt(0).toUpperCase() + briefing.risk_level.slice(1)} Risk
                      </Badge>
                    )}
                    {hasChanges && (
                      <Badge variant="outline" className="text-warning border-warning text-xs">
                        Unsaved
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="shrink-0 touch-manipulation"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Body */}
          <div className="flex-1 overflow-hidden flex flex-col p-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 bg-white/5 rounded-t-xl border border-white/10 border-b-0 mb-0">
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBold().run()}
                isActive={editor?.isActive("bold")}
                title="Bold"
                disabled={isPreview}
              >
                <Bold className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                isActive={editor?.isActive("italic")}
                title="Italic"
                disabled={isPreview}
              >
                <Italic className="h-4 w-4" />
              </ToolbarButton>

              <div className="w-px h-6 bg-white/10 mx-1" />

              <ToolbarButton
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                isActive={editor?.isActive("heading", { level: 2 })}
                title="Heading 2"
                disabled={isPreview}
              >
                <Heading2 className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 3 }).run()
                }
                isActive={editor?.isActive("heading", { level: 3 })}
                title="Heading 3"
                disabled={isPreview}
              >
                <Heading3 className="h-4 w-4" />
              </ToolbarButton>

              <div className="w-px h-6 bg-white/10 mx-1" />

              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                isActive={editor?.isActive("bulletList")}
                title="Bullet List"
                disabled={isPreview}
              >
                <List className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                isActive={editor?.isActive("orderedList")}
                title="Numbered List"
                disabled={isPreview}
              >
                <ListOrdered className="h-4 w-4" />
              </ToolbarButton>

              <div className="flex-1" />

              <ToolbarButton
                onClick={() => editor?.chain().focus().undo().run()}
                title="Undo"
                disabled={isPreview}
              >
                <Undo className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor?.chain().focus().redo().run()}
                title="Redo"
                disabled={isPreview}
              >
                <Redo className="h-4 w-4" />
              </ToolbarButton>

              <div className="w-px h-6 bg-white/10 mx-1" />

              {/* Preview toggle */}
              <Button
                type="button"
                variant={isPreview ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
                className="h-9 px-3"
              >
                {isPreview ? (
                  <>
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </>
                )}
              </Button>
            </div>

            {/* Editor / Preview */}
            <div
              className={cn(
                "bg-white/5 rounded-b-xl border border-white/10 border-t-0",
                "focus-within:border-elec-yellow/30 transition-colors",
                "flex-1 overflow-y-auto"
              )}
            >
              {isPreview ? (
                <div
                  className="prose prose-sm prose-invert max-w-none p-4 min-h-[300px] [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:mb-4 [&_li]:mb-1 [&_strong]:text-foreground [&_table]:w-full [&_td]:py-1 [&_td]:pr-4"
                  dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
                />
              ) : (
                <EditorContent editor={editor} />
              )}
            </div>

            {/* Help text */}
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>
                Use headings to structure your briefing. Changes auto-save as draft.
              </span>
            </div>

            {/* Editor styles */}
            <style>{`
              .ProseMirror {
                outline: none;
                min-height: 300px;
                padding: 1rem;
              }
              .ProseMirror.is-editor-empty:first-child::before {
                content: attr(data-placeholder);
                float: left;
                color: rgba(255, 255, 255, 0.3);
                pointer-events: none;
                height: 0;
              }
              .ProseMirror p.is-editor-empty:first-child::before {
                content: attr(data-placeholder);
                float: left;
                color: rgba(255, 255, 255, 0.3);
                pointer-events: none;
                height: 0;
              }
              .ProseMirror h2 {
                font-size: 1.25rem;
                margin-top: 1.5rem;
                margin-bottom: 0.5rem;
              }
              .ProseMirror h3 {
                font-size: 1.1rem;
                margin-top: 1.25rem;
                margin-bottom: 0.5rem;
              }
              .ProseMirror ul, .ProseMirror ol {
                padding-left: 1.5rem;
                margin: 0.75rem 0;
              }
              .ProseMirror li {
                margin: 0.25rem 0;
              }
              .ProseMirror p {
                margin: 0.5rem 0;
              }
              .ProseMirror table {
                border-collapse: collapse;
                width: 100%;
                margin: 1rem 0;
              }
              .ProseMirror td, .ProseMirror th {
                padding: 0.5rem;
                text-align: left;
              }
            `}</style>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border shrink-0">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 h-12 touch-manipulation"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={updateContent.isPending || !hasChanges}
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
              >
                {updateContent.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
