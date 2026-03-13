import { useState, useEffect, useCallback, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Sheet, SheetContent } from '@/components/ui/sheet';
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
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useUpdateUserDocument, type UserSafetyDocument } from '@/hooks/useSafetyTemplates';
import { sanitizeDocumentHtml } from '@/utils/inputSanitization';
import { structuredToHtml, getFieldValues } from '@/utils/safety-template-renderer';
import type { StructuredSafetyDocument, DocumentSection } from '@/types/safety-template';
import { SectionRenderer } from './sections/SectionRenderer';
import { SafetyDocumentShare } from '../common/SafetyDocumentShare';
import { useToast } from '@/hooks/use-toast';

const STATUS_OPTIONS = ['Draft', 'Active', 'Review Due', 'Archived'] as const;

const STATUS_COLOUR: Record<string, string> = {
  Draft: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Active: 'text-green-400 bg-green-500/10 border-green-500/20',
  'Review Due': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  Archived: 'text-white bg-white/[0.06] border-white/10',
};

interface SafetyTemplateEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: UserSafetyDocument;
  onSaved?: () => void;
}

const DRAFT_KEY_PREFIX = 'safety-doc-editor-draft-';

const SECTION_LABELS: Record<DocumentSection['type'], string> = {
  hazard_table: 'Hazards',
  steps: 'Procedure',
  checklist: 'Checklist',
  text_block: 'Details',
  bullet_list: 'Items',
  ppe_grid: 'PPE',
  signature_block: 'Sign-off',
  references: 'References',
  key_value: 'Information',
};

export function SafetyTemplateEditor({
  open,
  onOpenChange,
  document: doc,
  onSaved,
}: SafetyTemplateEditorProps) {
  const { toast } = useToast();
  const [isPreview, setIsPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(doc.status || 'Draft');

  const updateDocument = useUpdateUserDocument();
  const draftKey = `${DRAFT_KEY_PREFIX}${doc.id}`;

  // Structured content state
  const [structuredContent, setStructuredContent] = useState<StructuredSafetyDocument | null>(
    doc.structured_content ? structuredClone(doc.structured_content) : null
  );
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    if (doc.structured_content) return getFieldValues(doc.structured_content);
    return {};
  });

  // Track expanded sections (all open by default in edit mode)
  const [expandedSections, setExpandedSections] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    if (structuredContent) {
      structuredContent.sections.forEach((_, i) => initial.add(i));
    }
    return initial;
  });

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const isStructured = structuredContent !== null;

  // TipTap editor — only used for legacy (non-structured) documents
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({
        placeholder: 'Start editing your safety document...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: isStructured ? '' : doc.content,
    editable: !isStructured,
    onUpdate: ({ editor: ed }) => {
      if (!isStructured) {
        setHasChanges(true);
        localStorage.setItem(draftKey, ed.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-invert prose-sm max-w-none',
          'min-h-[300px] p-4 focus:outline-none',
          'prose-headings:text-white prose-headings:font-semibold',
          'prose-p:text-white prose-p:leading-relaxed',
          'prose-li:text-white',
          'prose-strong:text-white prose-strong:font-semibold',
          'prose-em:text-white'
        ),
      },
    },
  });

  // Draft recovery for legacy editor
  useEffect(() => {
    if (editor && !isStructured) {
      const draft = localStorage.getItem(draftKey);
      if (draft && draft !== doc.content) {
        const useDraft = window.confirm(
          'You have unsaved changes from a previous session. Would you like to restore them?'
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
  }, [editor, doc.content, draftKey, isStructured]);

  const handleClose = useCallback(() => {
    if (hasChanges) {
      const confirmClose = window.confirm(
        'You have unsaved changes. Are you sure you want to close?'
      );
      if (!confirmClose) return;
    }
    localStorage.removeItem(draftKey);
    onOpenChange(false);
  }, [hasChanges, draftKey, onOpenChange]);

  // Update a section in structured content
  const updateSection = useCallback(
    (index: number, updated: DocumentSection) => {
      if (!structuredContent) return;
      const sections = [...structuredContent.sections];
      sections[index] = updated;
      setStructuredContent({ ...structuredContent, sections });
      setHasChanges(true);
    },
    [structuredContent]
  );

  // Update a field value
  const updateFieldValue = useCallback((key: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  }, []);

  const handleSave = async () => {
    try {
      if (isStructured && structuredContent) {
        // Build updated structured content with field values baked in
        const updatedSc: StructuredSafetyDocument = {
          ...structuredContent,
          fields: structuredContent.fields.map((f) => ({
            ...f,
            default_value: fieldValues[f.key] ?? f.default_value ?? '',
          })),
        };
        // Generate HTML for legacy compat / PDF
        const html = sanitizeDocumentHtml(structuredToHtml(updatedSc, fieldValues));

        await updateDocument.mutateAsync({
          id: doc.id,
          content: html,
          structured_content: updatedSc as any,
          company_name: fieldValues.company_name ?? doc.company_name,
          site_address: fieldValues.site_address ?? doc.site_address,
        });
      } else if (editor) {
        // Legacy TipTap save
        const sanitisedContent = sanitizeDocumentHtml(editor.getHTML());
        await updateDocument.mutateAsync({
          id: doc.id,
          content: sanitisedContent,
        });
      }

      localStorage.removeItem(draftKey);
      setHasChanges(false);

      toast({
        title: 'Document Saved',
        description: 'Your changes have been saved successfully.',
      });

      onSaved?.();
      onOpenChange(false);
    } catch {
      // Error handled by mutation
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setShowStatusMenu(false);
    setCurrentStatus(newStatus as typeof currentStatus);
    try {
      await updateDocument.mutateAsync({
        id: doc.id,
        status: newStatus as any,
      });
      toast({ title: 'Status Updated', description: `Document is now "${newStatus}".` });
    } catch {
      setCurrentStatus(doc.status || 'Draft');
    }
  };

  const handleShare = () => {
    if (hasChanges) {
      toast({
        title: 'Save First',
        description: 'Please save your changes before sharing.',
        variant: 'destructive',
      });
      return;
    }
    setShowShare(true);
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
        'h-9 w-9 rounded-lg flex items-center justify-center touch-manipulation transition-colors',
        isActive ? 'bg-elec-yellow/20 text-elec-yellow' : 'text-white active:bg-white/10',
        disabled && 'opacity-30 pointer-events-none'
      )}
    >
      {children}
    </button>
  );

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[92vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-1.5 rounded-lg bg-elec-yellow/20">
                <Edit3 className="h-4 w-4 text-elec-yellow" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white truncate">{doc.name}</h3>
                  {/* Status badge (tappable) */}
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() => setShowStatusMenu(!showStatusMenu)}
                      className={cn(
                        'text-[9px] font-bold px-2 py-0.5 rounded-full border touch-manipulation transition-colors',
                        STATUS_COLOUR[currentStatus] ?? STATUS_COLOUR.Draft
                      )}
                    >
                      {currentStatus}
                    </button>
                    {showStatusMenu && (
                      <div className="absolute top-full left-0 mt-1 z-50 bg-[#1a1f2e] border border-white/10 rounded-lg shadow-lg overflow-hidden min-w-[120px]">
                        {STATUS_OPTIONS.map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            className={cn(
                              'w-full text-left px-3 py-2 text-[11px] font-semibold touch-manipulation transition-colors',
                              status === currentStatus
                                ? 'bg-white/[0.08] text-elec-yellow'
                                : 'text-white active:bg-white/[0.06]'
                            )}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {hasChanges && (
                  <span className="text-[10px] font-semibold text-amber-400">Unsaved changes</span>
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

          {/* Toolbar — only for legacy editor */}
          {!isStructured && (
            <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10 bg-white/[0.02] overflow-x-auto scrollbar-hide">
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBold().run()}
                isActive={editor?.isActive('bold')}
                title="Bold"
                disabled={isPreview}
              >
                <Bold className="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                isActive={editor?.isActive('italic')}
                title="Italic"
                disabled={isPreview}
              >
                <Italic className="h-4 w-4" />
              </ToolbarButton>

              <div className="w-px h-5 bg-white/10 mx-0.5" />

              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor?.isActive('heading', { level: 2 })}
                title="Heading 2"
                disabled={isPreview}
              >
                <Heading2 className="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                isActive={editor?.isActive('heading', { level: 3 })}
                title="Heading 3"
                disabled={isPreview}
              >
                <Heading3 className="h-4 w-4" />
              </ToolbarButton>

              <div className="w-px h-5 bg-white/10 mx-0.5" />

              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                isActive={editor?.isActive('bulletList')}
                title="Bullet List"
                disabled={isPreview}
              >
                <List className="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                isActive={editor?.isActive('orderedList')}
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
                  'h-9 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 touch-manipulation transition-colors whitespace-nowrap',
                  isPreview ? 'bg-elec-yellow/20 text-elec-yellow' : 'text-white active:bg-white/10'
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
          )}

          {/* Structured toolbar — preview/edit toggle */}
          {isStructured && (
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02]">
              <p className="text-[11px] text-white">
                {structuredContent!.sections.length} sections
              </p>
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className={cn(
                  'h-9 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 touch-manipulation transition-colors whitespace-nowrap',
                  isPreview ? 'bg-elec-yellow/20 text-elec-yellow' : 'text-white active:bg-white/10'
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
          )}

          {/* Editor / Preview body */}
          <div className="flex-1 overflow-y-auto">
            {isStructured && structuredContent ? (
              <div className="p-4 space-y-4">
                {/* Field inputs at top */}
                {!isPreview && (
                  <div className="space-y-3 p-3 rounded-xl border border-white/[0.08] bg-white/[0.03]">
                    <h4 className="text-[12px] font-bold text-white">Document Details</h4>
                    {structuredContent.fields.map((field) => (
                      <div key={field.key}>
                        <label className="text-[11px] font-semibold text-white block mb-1">
                          {field.label}
                          {field.required && <span className="text-red-400 ml-0.5">*</span>}
                        </label>
                        <Input
                          type={field.type === 'date' ? 'date' : 'text'}
                          value={fieldValues[field.key] ?? ''}
                          onChange={(e) => updateFieldValue(field.key, e.target.value)}
                          placeholder={field.placeholder ?? field.label}
                          className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Preview mode: show field values */}
                {isPreview && (
                  <div className="space-y-1">
                    {structuredContent.fields.map((field) => (
                      <div key={field.key} className="flex items-baseline gap-2 px-3 py-1.5">
                        <span className="text-[12px] font-semibold text-white">{field.label}:</span>
                        <span className="text-[12px] text-white">
                          {fieldValues[field.key] || '___'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sections */}
                <div className="space-y-2">
                  {structuredContent.sections.map((section, i) => {
                    const isOpen = expandedSections.has(i);
                    return (
                      <div
                        key={i}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden"
                      >
                        <button
                          onClick={() => toggleSection(i)}
                          className="w-full flex items-center justify-between p-3 touch-manipulation"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-white bg-white/[0.06] rounded px-1.5 py-0.5">
                              {SECTION_LABELS[section.type]}
                            </span>
                            <h3 className="text-[13px] font-semibold text-white">
                              {section.title}
                            </h3>
                          </div>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 text-white" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-white" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-3 pb-3">
                            <SectionRenderer
                              section={section}
                              mode={isPreview ? 'preview' : 'edit'}
                              onChange={(updated) => updateSection(i, updated)}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Legacy TipTap editor */
              <>
                {isPreview ? (
                  <div
                    className="prose prose-sm prose-invert max-w-none p-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:text-base [&_h3]:font-semibold [&_ul]:list-disc [&_ol]:list-decimal [&_li]:text-white [&_p]:text-white"
                    dangerouslySetInnerHTML={{
                      __html: editor?.getHTML() || '',
                    }}
                  />
                ) : (
                  <EditorContent editor={editor} />
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-background">
            <button
              onClick={handleClose}
              className="h-11 px-4 rounded-xl border border-white/[0.1] text-white text-sm font-semibold touch-manipulation active:scale-[0.97] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleShare}
              className="h-11 px-4 rounded-xl border border-white/[0.1] text-white text-sm font-semibold touch-manipulation active:scale-[0.97] transition-all flex items-center justify-center gap-1.5"
            >
              <Share2 className="h-4 w-4" />
              Share
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

          {/* Share sheet */}
          {showShare && (
            <SafetyDocumentShare
              open={showShare}
              onClose={() => setShowShare(false)}
              pdfType="safety-document"
              recordId={doc.id}
              documentTitle={doc.name}
            />
          )}

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
