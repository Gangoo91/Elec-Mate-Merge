import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TextBlockSection as TextBlockSectionType } from '@/types/safety-template';

interface Props {
  section: TextBlockSectionType;
  mode: 'preview' | 'edit';
  onChange?: (section: TextBlockSectionType) => void;
}

export function TextBlockSection({ section, mode, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Placeholder.configure({
        placeholder: 'Enter content...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: section.content,
    editable: mode === 'edit',
    onUpdate: ({ editor: ed }) => {
      onChange?.({ ...section, content: ed.getHTML() });
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-invert prose-sm max-w-none',
          'min-h-[80px] p-3 focus:outline-none',
          'prose-p:text-white prose-li:text-white',
          'prose-strong:text-white prose-em:text-white'
        ),
      },
    },
  });

  if (mode === 'preview') {
    return (
      <div
        className="prose prose-invert prose-sm max-w-none p-3 [&_p]:text-white [&_li]:text-white [&_strong]:text-white [&_em]:text-white"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    );
  }

  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      {/* Mini toolbar */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-white/[0.06] bg-white/[0.02]">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={cn(
            'h-8 w-8 rounded flex items-center justify-center touch-manipulation',
            editor?.isActive('bold') ? 'bg-elec-yellow/20 text-elec-yellow' : 'text-white'
          )}
        >
          <Bold className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={cn(
            'h-8 w-8 rounded flex items-center justify-center touch-manipulation',
            editor?.isActive('italic') ? 'bg-elec-yellow/20 text-elec-yellow' : 'text-white'
          )}
        >
          <Italic className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={cn(
            'h-8 w-8 rounded flex items-center justify-center touch-manipulation',
            editor?.isActive('bulletList') ? 'bg-elec-yellow/20 text-elec-yellow' : 'text-white'
          )}
        >
          <List className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={cn(
            'h-8 w-8 rounded flex items-center justify-center touch-manipulation',
            editor?.isActive('orderedList') ? 'bg-elec-yellow/20 text-elec-yellow' : 'text-white'
          )}
        >
          <ListOrdered className="h-3.5 w-3.5" />
        </button>
      </div>
      <EditorContent editor={editor} />
      <style>{`
        .ProseMirror { outline: none; }
        .ProseMirror.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(255,255,255,0.3);
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}

export default TextBlockSection;
