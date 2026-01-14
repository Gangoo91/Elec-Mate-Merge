import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
  ResponsiveFormModalFooter,
} from "@/components/ui/responsive-form-modal";
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
  FileText,
  Save,
  X,
  Eye,
  Edit3,
  Loader2,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useUpdatePolicy, type UserPolicy } from "@/hooks/usePolicies";
import { sanitizeHtmlSafe } from "@/utils/inputSanitization";
import { useToast } from "@/hooks/use-toast";

interface PolicyEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  policy: UserPolicy;
  onSaved?: () => void;
}

const DRAFT_KEY_PREFIX = "policy-editor-draft-";

export function PolicyEditor({
  open,
  onOpenChange,
  policy,
  onSaved,
}: PolicyEditorProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isPreview, setIsPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updatePolicy = useUpdatePolicy();

  const draftKey = `${DRAFT_KEY_PREFIX}${policy.id}`;

  // Initialize editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your policy content...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: policy.content,
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
          "prose-em:text-white/90"
        ),
      },
    },
  });

  // Load draft on mount
  useEffect(() => {
    if (editor) {
      const draft = localStorage.getItem(draftKey);
      if (draft && draft !== policy.content) {
        // Ask user if they want to restore draft
        const useDraft = window.confirm(
          "You have unsaved changes from a previous session. Would you like to restore them?"
        );
        if (useDraft) {
          editor.commands.setContent(draft);
          setHasChanges(true);
        } else {
          localStorage.removeItem(draftKey);
          editor.commands.setContent(policy.content);
        }
      } else {
        editor.commands.setContent(policy.content);
      }
    }
  }, [editor, policy.content, draftKey]);

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

  // Save policy
  const handleSave = async () => {
    if (!editor) return;

    try {
      // Sanitise HTML before saving
      const sanitisedContent = sanitizeHtmlSafe(editor.getHTML());

      await updatePolicy.mutateAsync({
        id: policy.id,
        content: sanitisedContent,
      });

      // Clear draft
      localStorage.removeItem(draftKey);
      setHasChanges(false);

      toast({
        title: "Policy saved",
        description: "Your changes have been saved successfully.",
      });

      onSaved?.();
      onOpenChange(false);
    } catch (error) {
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
      size="sm"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={cn(
        "h-9 w-9 p-0 rounded-lg touch-manipulation",
        isActive
          ? "bg-elec-yellow/20 text-elec-yellow"
          : "text-white/60 hover:text-white hover:bg-white/10"
      )}
    >
      {children}
    </Button>
  );

  const characterCount = editor?.storage.characterCount?.characters?.() || 0;

  return (
    <ResponsiveFormModal open={open} onOpenChange={handleClose}>
      <ResponsiveFormModalContent className={cn(isMobile ? "" : "max-w-4xl")}>
        {/* Header */}
        <ResponsiveFormModalHeader className="border-b border-border/50">
          <div className="flex items-center justify-between">
            <ResponsiveFormModalTitle>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/20">
                  <Edit3 className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <span className="text-lg font-semibold">Edit Policy</span>
                  <p className="text-xs text-muted-foreground font-normal line-clamp-1">
                    {policy.name}
                  </p>
                </div>
              </div>
            </ResponsiveFormModalTitle>

            <div className="flex items-center gap-2">
              {hasChanges && (
                <Badge variant="outline" className="text-warning border-warning">
                  Unsaved
                </Badge>
              )}
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </ResponsiveFormModalHeader>

        {/* Body */}
        <ResponsiveFormModalBody className="py-4">
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
              "min-h-[400px] max-h-[60vh] overflow-y-auto"
            )}
          >
            {isPreview ? (
              <div
                className="prose prose-sm prose-invert max-w-none p-4 min-h-[400px] [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:mb-4 [&_li]:mb-1 [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
              />
            ) : (
              <EditorContent editor={editor} />
            )}
          </div>

          {/* Stats */}
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>
              Use headings to structure your policy. Changes auto-save as draft.
            </span>
            <span>{characterCount} characters</span>
          </div>

          {/* Editor styles */}
          <style>{`
            .ProseMirror {
              outline: none;
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
          `}</style>
        </ResponsiveFormModalBody>

        {/* Footer */}
        <ResponsiveFormModalFooter>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 sm:flex-none min-h-[48px]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={updatePolicy.isPending || !hasChanges}
              className="flex-1 min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              {updatePolicy.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </ResponsiveFormModalFooter>
      </ResponsiveFormModalContent>
    </ResponsiveFormModal>
  );
}
