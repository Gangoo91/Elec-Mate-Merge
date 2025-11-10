import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package } from "lucide-react";

interface MaterialsTableProps {
  items: any[];
}

const MaterialsTable = ({ items }: MaterialsTableProps) => {
  if (!items || items.length === 0) return null;

  const total = items.reduce((sum, item) => sum + (item.total || 0), 0);

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Package className="h-5 w-5 text-elec-yellow" />
          Materials Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {item.item || item.description}
                    {item.supplier && (
                      <div className="text-xs text-muted-foreground">
                        {item.supplier}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    £{item.unitPrice?.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    £{item.total?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell colSpan={3} className="text-right">Total Materials:</TableCell>
                <TableCell className="text-right font-mono">£{total.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialsTable;
