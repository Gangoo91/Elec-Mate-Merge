import { cn } from '@/lib/utils';

interface DataTableProps<T> {
  title?: string;
  data: T[];
  columns: {
    key: keyof T | string;
    label: string;
    render?: (item: T) => React.ReactNode;
  }[];
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
  className,
}: DataTableProps<T>) {
  return (
    <div
      className={cn(
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden',
        className
      )}
    >
      {title && (
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06]">
          <div className="text-[13px] font-semibold text-white">{title}</div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="text-left py-3 px-5 text-[10px] font-medium uppercase tracking-[0.18em] text-white"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {data.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="py-3.5 px-5 text-[13px] text-white">
                    {col.render ? col.render(item) : (item[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
