import { Check, X, Minus } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  values: Array<boolean | string | null>;
}

interface SEOComparisonTableProps {
  columns: string[];
  rows: ComparisonRow[];
  heading?: string;
}

export function SEOComparisonTable({ columns, rows, heading }: SEOComparisonTableProps) {
  const renderCell = (value: boolean | string | null) => {
    if (value === true) return <Check className="w-5 h-5 text-green-400 mx-auto" />;
    if (value === false) return <X className="w-5 h-5 text-red-400 mx-auto" />;
    if (value === null) return <Minus className="w-5 h-5 text-white mx-auto" />;
    return <span className="text-sm text-white">{value}</span>;
  };

  return (
    <div>
      {heading && <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{heading}</h2>}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-sm font-semibold text-white">Feature</th>
              {columns.map((col) => (
                <th key={col} className="p-4 text-sm font-semibold text-center text-white">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.feature}
                className={index < rows.length - 1 ? 'border-b border-white/5' : ''}
              >
                <td className="p-4 text-sm text-white">{row.feature}</td>
                {row.values.map((val, vIndex) => (
                  <td key={vIndex} className="p-4 text-center">
                    {renderCell(val)}
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
