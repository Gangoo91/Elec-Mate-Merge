import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Kbd } from './index';

export type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  path?: string;
  action?: () => void;
};

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
}

export function CommandPalette({ open, onOpenChange, items }: CommandPaletteProps) {
  const [query, setQuery] = React.useState('');
  const [cursor, setCursor] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q) ||
        i.hint?.toLowerCase().includes(q)
    );
  }, [items, query]);

  const grouped = React.useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((i) => {
      const arr = map.get(i.group) ?? [];
      arr.push(i);
      map.set(i.group, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  React.useEffect(() => {
    setCursor(0);
  }, [query, open]);

  React.useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    } else {
      setQuery('');
    }
  }, [open]);

  const runItem = React.useCallback(
    (item: CommandItem) => {
      onOpenChange(false);
      if (item.action) item.action();
      else if (item.path) navigate(item.path);
    },
    [navigate, onOpenChange]
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onOpenChange(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = filtered[cursor];
        if (item) runItem(item);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, cursor, onOpenChange, runItem]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="w-full max-w-[640px] bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
              <span aria-hidden className="text-white text-[15px]">⌕</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users, pages, actions…"
                className="flex-1 h-9 bg-transparent text-[14px] text-white placeholder:text-white focus:outline-none"
              />
              <Kbd>Esc</Kbd>
            </div>
            <div className="max-h-[60vh] overflow-y-auto py-2">
              {grouped.length === 0 && (
                <div className="px-5 py-10 text-center">
                  <div className="text-[13px] text-white">No matches</div>
                  <div className="mt-1 text-[11.5px] text-white">
                    Try a different search
                  </div>
                </div>
              )}
              {grouped.map(([group, groupItems]) => (
                <div key={group} className="py-1">
                  <div className="px-4 pt-2 pb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    {group}
                  </div>
                  {groupItems.map((item) => {
                    const flatIndex = filtered.indexOf(item);
                    const isActive = flatIndex === cursor;
                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => setCursor(flatIndex)}
                        onClick={() => runItem(item)}
                        className={cn(
                          'w-full flex items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors',
                          isActive ? 'bg-elec-yellow/10' : 'hover:bg-white/[0.04]'
                        )}
                      >
                        <span
                          className={cn(
                            'text-[13.5px] font-medium truncate',
                            isActive ? 'text-elec-yellow' : 'text-white'
                          )}
                        >
                          {item.label}
                        </span>
                        {item.hint && (
                          <span className="text-[11px] text-white shrink-0 truncate max-w-[40%]">
                            {item.hint}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-t border-white/[0.06] bg-[hsl(0_0%_9%)]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                  <span className="text-[10.5px] text-white">navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Kbd>↵</Kbd>
                  <span className="text-[10.5px] text-white">select</span>
                </div>
              </div>
              <div className="text-[10.5px] text-white">
                {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
