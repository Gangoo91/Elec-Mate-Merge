import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { TestResult } from '@/types/testResult';
import { LucideIcon } from 'lucide-react';

interface CircuitTypeItem {
  type: string;
  icon: LucideIcon;
  category: string;
  suggestions: Partial<TestResult>;
}

interface CircuitTypeListPanelProps {
  value: string;
  onChange: (value: string) => void;
  items: CircuitTypeItem[];
}

const CircuitTypeListPanel: React.FC<CircuitTypeListPanelProps> = ({ value, onChange, items }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return items;
    return items.filter(
      item =>
        item.type.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );
  }, [searchQuery, items]);

  const groupedItems = useMemo(() => {
    const map = new Map<string, CircuitTypeItem[]>();
    filteredItems.forEach(item => {
      if (!map.has(item.category)) {
        map.set(item.category, []);
      }
      map.get(item.category)!.push(item);
    });
    return Array.from(map.entries());
  }, [filteredItems]);

  return (
    <div className="space-y-2">
      <Input
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search circuit types..."
        className="h-9 bg-muted border-border text-sm"
      />
      <div className="max-h-[35vh] overflow-y-auto overscroll-contain dropdown-scrollbar bg-muted/60 border border-border rounded-lg p-2">
        {groupedItems.length === 0 ? (
          <div className="px-3 py-4 text-sm text-muted-foreground text-center">
            No circuit types found
          </div>
        ) : (
          groupedItems.map(([category, categoryItems]) => (
            <div key={category} className="mb-2 last:mb-0">
              <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {category}
              </div>
              <div className="space-y-1">
                {categoryItems.map(item => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => onChange(item.type)}
                    className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent focus:bg-accent min-h-[40px] transition-colors ${
                      value === item.type ? 'bg-accent' : 'bg-transparent'
                    }`}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{item.type}</span>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CircuitTypeListPanel;
