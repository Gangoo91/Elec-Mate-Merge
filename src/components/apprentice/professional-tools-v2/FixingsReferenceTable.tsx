interface Column {
  header: string;
  accessor: string;
  colourSwatch?: boolean;
}

interface FixingsReferenceTableProps {
  columns: Column[];
  data: Record<string, string>[];
  colourKey?: string;
}

const FixingsReferenceTable = ({
  columns,
  data,
  colourKey,
}: FixingsReferenceTableProps) => {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="py-2 pr-3 text-white font-semibold whitespace-nowrap text-xs"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-white/5 last:border-0"
            >
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className="py-2.5 pr-3 text-white text-xs"
                >
                  {col.colourSwatch && colourKey && row[colourKey] ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-sm flex-shrink-0 border border-white/20"
                        style={{ backgroundColor: row[colourKey] }}
                      />
                      <span>{row[col.accessor]}</span>
                    </span>
                  ) : (
                    row[col.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FixingsReferenceTable;
