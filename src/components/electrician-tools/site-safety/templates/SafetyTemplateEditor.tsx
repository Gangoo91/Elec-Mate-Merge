import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useUpdateUserDocument,
  type UserSafetyDocument,
} from "@/hooks/useSafetyTemplates";
import { sanitizeHtmlSafe } from "@/utils/inputSanitization";
import { useToast } from "@/hooks/use-toast";

interface SafetyTemplateEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: UserSafetyDocument;
  onSaved?: () => void;
}

const DRAFT_KEY_PREFIX = "safety-doc-editor-draft-";

export function SafetyTemplateEditor({
  open,
  onOpenChange,
  document: doc,
  onSaved,
}: SafetyTemplateEditorProps) {
  const { toast } = useToast();
  const [isPreview, setIsPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updateDocument = useUpdateUserDocument();

  const draftKey = `${DRAFT_KEY_PREFIX}${doc.id}`;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({
        placeholder: "Start editing your safety document...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: doc.content,
    onUpdate: ({ editor: ed }) => {
      setHasChanges(true);
      localStorage.setItem(draftKey, ed.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-invert prose-sm max-w-none",
          "min-h-[300px] p-4 focus:outline-none",
          "prose-headings:text-white prose-headings:font-semibold",
          "prose-p:text-white prose-p:leading-relaxed",
          "prose-li:text-white",
          "prose-strong:text-white prose-strong:font-semibold",
          "prose-em:text-white"
        ),
      },
    },
  });

  useEffect(() => {
    if (editor) {
      const draft = localStorage.getItem(draftKey);
      if (draft && draft !== doc.content) {
        const useDraft = window.confirm(
          "You have unsaved changes from a previous session. Would you like to restore them?"
        );
        if (useDraft) {
          editor.commands.setContent(draft);
          setHasChanges(true);
        } else {
          localStorage.removeItem(draftKey);
          editor.commands.setContent(doc.content);
        }
      } else {
        editor.commands.setContent(doc.content);
      }
    }
  }, [editor, doc.content, draftKey]);

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

  const handleSave = async () => {
    if (!editor) return;

    try {
      const sanitisedContent = sanitizeHtmlSafe(editor.getHTML());

      await updateDocument.mutateAsync({
        id: doc.id,
        content: sanitisedContent,
      });

      localStorage.removeItem(draftKey);
      setHasChanges(false);

      toast({
        title: "Document Saved",
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
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={cn(
        "h-9 w-9 rounded-lg flex items-center justify-center touch-manipulation transition-colors",
        isActive
          ? "bg-elec-yellow/20 text-elec-yellow"
          : "text-white active:bg-white/10",
        disabled && "opacity-30 pointer-events-none"
      )}
    >
      {children}
    </button>
  );

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="bottom"
        className="h-[92vh] p-0 rounded-t-2xl overflow-hidden"
      >
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-1.5 rounded-lg bg-elec-yellow/20">
                <Edit3 className="h-4 w-4 text-elec-yellow" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">
                  {doc.name}
                </h3>
                {hasChanges && (
                  <span className="text-[10px] font-semibold text-amber-400">
                    Unsaved changes
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="h-9 w-9 rounded-lg flex items-center justify-center text-white active:bg-white/10 touch-manipulation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10 bg-white/[0.02] overflow-x-auto scrollbar-hide">
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

            <div className="w-px h-5 bg-white/10 mx-0.5" />

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

            <div className="w-px h-5 bg-white/10 mx-0.5" />

            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              isActive={editor?.isActive("bulletList")}
              title="Bullet List"
              disabled={isPreview}
            >
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().toggleOrderedList().run()
              }
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

            <div className="w-px h-5 bg-white/10 mx-0.5" />

            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className={cn(
                "h-9 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 touch-manipulation transition-colors whitespace-nowrap",
                isPreview
                  ? "bg-elec-yellow/20 text-elec-yellow"
                  : "text-white active:bg-white/10"
              )}
            >
              {isPreview ? (
                <>
                  <Edit3 className="h-3.5 w-3.5" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  Preview
                </>
              )}
            </button>
          </div>

          {/* Editor / Preview */}
          <div className="flex-1 overflow-y-auto">
            {isPreview ? (
              <div
                className="prose prose-sm prose-invert max-w-none p-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:text-base [&_h3]:font-semibold [&_ul]:list-disc [&_ol]:list-decimal [&_li]:text-white [&_p]:text-white"
                dangerouslySetInnerHTML={{
                  __html: editor?.getHTML() || "",
                }}
              />
            ) : (
              <EditorContent editor={editor} />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 px-4 py-3 border-t border-white/10 bg-background">
            <button
              onClick={handleClose}
              className="flex-1 h-11 rounded-xl border border-white/[0.1] text-white text-sm font-semibold touch-manipulation active:scale-[0.97] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={updateDocument.isPending || !hasChanges}
              className="flex-1 h-11 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.97] active:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {updateDocument.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save
            </button>
          </div>

          {/* TipTap styles */}
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
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SafetyTemplateEditor;
