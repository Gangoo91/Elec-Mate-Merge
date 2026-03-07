import { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { X, Loader2, Link2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { UnlinkedItem } from '@/hooks/useProjectEntities';

interface LinkEntitySheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fetchItems: () => Promise<UnlinkedItem[]>;
  onSelect: (id: string) => Promise<boolean>;
  /** Label for the create button e.g. "Create new quote" */
  createLabel?: string;
  /** Route to navigate to when create button is tapped */
  createUrl?: string;
}

export function LinkEntitySheet({
  isOpen,
  onClose,
  title,
  fetchItems,
  onSelect,
  createLabel,
  createUrl,
}: LinkEntitySheetProps) {
  const navigate = useNavigate();
  const [items, setItems] = useState<UnlinkedItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [linking, setLinking] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    fetchItems()
      .then(setItems)
      .finally(() => setIsLoading(false));
  }, [isOpen, fetchItems]);

  async function handleSelect(id: string) {
    setLinking(id);
    const ok = await onSelect(id);
    setLinking(null);
    if (ok) onClose();
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl bg-background max-h-[70vh] outline-none">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pb-3 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 touch-manipulation"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
            {/* Create new button — shown whenever a createUrl is provided */}
            {createLabel && createUrl && (
              <button
                type="button"
                onClick={() => { onClose(); navigate(createUrl); }}
                className="w-full flex items-center gap-3 min-h-[48px] px-4 py-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 text-left touch-manipulation active:bg-elec-yellow/20 transition-colors mb-1"
              >
                <Plus className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="text-sm font-semibold text-elec-yellow">{createLabel}</span>
              </button>
            )}

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center py-6 text-center">
                <Link2 className="h-5 w-5 text-white/40 mb-2" />
                <p className="text-sm text-white/60">No existing items to link.</p>
              </div>
            ) : (
              items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  disabled={linking !== null}
                  className="w-full flex items-center justify-between min-h-[44px] px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-left touch-manipulation active:bg-white/[0.08] transition-colors disabled:opacity-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{item.label}</p>
                    {item.sublabel && (
                      <p className="text-[12px] text-white truncate">{item.sublabel}</p>
                    )}
                  </div>
                  {linking === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin text-white ml-2 flex-shrink-0" />
                  ) : (
                    <Link2 className="h-4 w-4 text-white ml-2 flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
