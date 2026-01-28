import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ExpenseGroup } from '@/types/expense';
import { ExpenseCard } from './ExpenseCard';
import { cn } from '@/lib/utils';
import {
  Fuel,
  Wrench,
  HardHat,
  Package,
  Hotel,
  Car,
  GraduationCap,
  Truck,
  Shield,
  CreditCard,
  UtensilsCrossed,
  MoreHorizontal,
} from 'lucide-react';

// Icon mapping for categories
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  fuel: Fuel,
  tools: Wrench,
  ppe: HardHat,
  materials: Package,
  hotels: Hotel,
  mileage: Car,
  training: GraduationCap,
  vehicle: Truck,
  insurance: Shield,
  subscriptions: CreditCard,
  meals: UtensilsCrossed,
  other: MoreHorizontal,
};

// Colour classes for backgrounds
const COLOUR_CLASSES: Record<string, string> = {
  'orange-500': 'bg-orange-500/15 text-orange-400',
  'amber-500': 'bg-amber-500/15 text-amber-400',
  'red-500': 'bg-red-500/15 text-red-400',
  'cyan-500': 'bg-cyan-500/15 text-cyan-400',
  'purple-500': 'bg-purple-500/15 text-purple-400',
  'green-500': 'bg-green-500/15 text-green-400',
  'teal-500': 'bg-teal-500/15 text-teal-400',
  'slate-500': 'bg-slate-500/15 text-slate-400',
  'indigo-500': 'bg-indigo-500/15 text-indigo-400',
  'pink-500': 'bg-pink-500/15 text-pink-400',
  'rose-500': 'bg-rose-500/15 text-rose-400',
  'gray-500': 'bg-gray-500/15 text-gray-400',
};

interface ExpenseCategorySectionProps {
  group: ExpenseGroup;
  onDeleteExpense: (expenseId: string) => void;
  onEditExpense?: (expenseId: string) => void;
  onExpenseClick?: (expenseId: string) => void;
  defaultExpanded?: boolean;
}

export function ExpenseCategorySection({
  group,
  onDeleteExpense,
  onEditExpense,
  onExpenseClick,
  defaultExpanded = true,
}: ExpenseCategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const CategoryIcon = CATEGORY_ICONS[group.category] || MoreHorizontal;
  const colourClass = COLOUR_CLASSES[group.config.colour] || 'bg-gray-500/15 text-gray-400';

  return (
    <div className="mb-4">
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between p-3 rounded-lg touch-manipulation active:scale-[0.98] transition-all",
          colourClass.split(' ')[0] // Just the background colour
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn("w-8 h-8 rounded-md flex items-center justify-center", colourClass)}>
            <CategoryIcon className="h-4 w-4" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-foreground">
              {group.config.label.toUpperCase()}
            </span>
            <span className="text-muted-foreground ml-2 text-sm">
              ({group.count})
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-foreground">
            £{group.total.toFixed(2)}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expense Cards */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 pt-2 pl-2">
              {group.expenses.map((expense, index) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onDelete={() => onDeleteExpense(expense.id)}
                  onEdit={onEditExpense ? () => onEditExpense(expense.id) : undefined}
                  onClick={onExpenseClick ? () => onExpenseClick(expense.id) : undefined}
                  delay={index * 0.03}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
