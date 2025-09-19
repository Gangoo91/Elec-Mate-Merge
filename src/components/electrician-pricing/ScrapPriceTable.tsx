
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ScrapPriceItem {
  id: number;
  material: string;
  price: string;
  change: string;
  trend: "up" | "down" | "neutral";
  unit: string;
}

interface ScrapPriceTableProps {
  items: ScrapPriceItem[];
}

const ScrapPriceTable = ({ items }: ScrapPriceTableProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-xl">Scrap Metal Prices</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.material}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <span className={`flex items-center ${
                      item.trend === "up" 
                        ? "text-green-500" 
                        : item.trend === "down"
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}>
                      {item.trend === "up" 
                        ? <TrendingUp className="h-4 w-4 mr-1" /> 
                        : item.trend === "down"
                        ? <TrendingDown className="h-4 w-4 mr-1" />
                        : null
                      }
                      {item.change}
                    </span>
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScrapPriceTable;
