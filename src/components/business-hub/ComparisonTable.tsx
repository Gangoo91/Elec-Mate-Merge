import { ReactNode } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonColumn {
  header: string;
  highlight?: boolean;
}

interface ComparisonRow {
  label: string;
  values: (string | boolean)[];
}

interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  className?: string;
  footer?: ReactNode;
}

const ComparisonTable = ({ columns, rows, className, footer }: ComparisonTableProps) => {
  return (
    <div className={cn('rounded-2xl overflow-hidden border border-white/10', className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-white bg-white/[0.03] border-b border-white/10 w-[35%]" />
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={cn(
                    'px-4 py-3 text-sm font-bold text-center border-b border-white/10',
                    col.highlight
                      ? 'bg-yellow-400/10 text-yellow-400'
                      : 'bg-white/[0.03] text-white'
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 text-sm font-medium text-white bg-white/[0.01]">
                  {row.label}
                </td>
                {row.values.map((val, vi) => (
                  <td
                    key={vi}
                    className={cn(
                      'px-4 py-3 text-sm text-center',
                      columns[vi]?.highlight ? 'bg-yellow-400/[0.03]' : ''
                    )}
                  >
                    {typeof val === 'boolean' ? (
                      val ? (
                        <CheckCircle className="h-5 w-5 text-yellow-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-white/30 mx-auto" />
                      )
                    ) : (
                      <span className="text-white">{val}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footer && (
        <div className="px-4 py-3 bg-white/[0.02] border-t border-white/10 text-xs text-white">
          {footer}
        </div>
      )}
    </div>
  );
};

export default ComparisonTable;
