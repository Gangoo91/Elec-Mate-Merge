import { Plus, Trash2, PenTool } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type {
  SignatureBlockSection as SignatureBlockSectionType,
  SignatureEntry,
} from '@/types/safety-template';

interface Props {
  section: SignatureBlockSectionType;
  mode: 'preview' | 'edit';
  onChange?: (section: SignatureBlockSectionType) => void;
}

export function SignatureBlockSection({ section, mode, onChange }: Props) {
  const updateEntry = (index: number, patch: Partial<SignatureEntry>) => {
    const entries = [...section.entries];
    entries[index] = { ...entries[index], ...patch };
    onChange?.({ ...section, entries });
  };

  const removeEntry = (index: number) => {
    const entries = section.entries.filter((_, i) => i !== index);
    onChange?.({ ...section, entries });
  };

  const addEntry = () => {
    onChange?.({
      ...section,
      entries: [...section.entries, { role: '', name: '', date: '', signature: '' }],
    });
  };

  if (mode === 'preview') {
    return (
      <div className="space-y-3">
        {section.entries.map((entry, i) => (
          <div
            key={i}
            className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.02] space-y-2"
          >
            <p className="text-[12px] font-semibold text-white">{entry.role || 'Role'}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-white mb-0.5">Name</p>
                <p className="text-[12px] text-white">{entry.name || '_______________'}</p>
              </div>
              <div>
                <p className="text-[10px] text-white mb-0.5">Date</p>
                <p className="text-[12px] text-white">{entry.date || '___/___/______'}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-white mb-0.5">Signature</p>
              {entry.signature ? (
                <img
                  src={entry.signature}
                  alt="Signature"
                  className="h-12 border border-white/[0.1] rounded bg-white/[0.03]"
                />
              ) : (
                <div className="h-12 border border-dashed border-white/[0.15] rounded flex items-center justify-center">
                  <PenTool className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {section.entries.map((entry, i) => (
        <div
          key={i}
          className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.02] space-y-2"
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-white">Signatory {i + 1}</p>
            <button
              onClick={() => removeEntry(i)}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-red-400 active:bg-red-500/10 touch-manipulation"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <Input
            value={entry.role}
            onChange={(e) => updateEntry(i, { role: e.target.value })}
            placeholder="Role (e.g. Assessor, Supervisor)"
            className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={entry.name}
              onChange={(e) => updateEntry(i, { name: e.target.value })}
              placeholder="Full name"
              className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white"
            />
            <Input
              type="date"
              value={entry.date}
              onChange={(e) => updateEntry(i, { date: e.target.value })}
              className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addEntry}
        className="w-full h-11 rounded-xl border border-dashed border-white/[0.15] text-white text-sm font-semibold flex items-center justify-center gap-2 touch-manipulation active:bg-white/[0.03]"
      >
        <Plus className="h-4 w-4" /> Add Signatory
      </button>
    </div>
  );
}

export default SignatureBlockSection;
