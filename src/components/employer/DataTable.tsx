import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  className 
}: DataTableProps<T>) {
  return (
    <Card className={cn("card-hover", className)}>
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(!title && "pt-6")}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {columns.map((col) => (
                  <th 
                    key={String(col.key)} 
                    className="text-left py-3 px-4 text-sm font-medium text-muted-foreground"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr 
                  key={idx} 
                  className="border-b border-border/50 last:border-0 hover:bg-secondary/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="py-3 px-4 text-sm">
                      {col.render ? col.render(item) : item[col.key as keyof T]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}