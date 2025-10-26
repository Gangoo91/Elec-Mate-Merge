import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Download, Building2, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface OrderItem {
  code?: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

interface SupplierOrder {
  items: OrderItem[];
  subtotal: number;
  accountNumber?: string;
}

interface OrderListData {
  bySupplier: Record<string, SupplierOrder>;
  totalItems: number;
  estimatedDelivery?: string;
  notes?: string[];
}

interface OrderListPanelProps {
  orderList: OrderListData;
}

const OrderListPanel = ({ orderList }: OrderListPanelProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const handleExportCSV = () => {
    let csv = 'Supplier,Code,Description,Quantity,Unit,Unit Price,Total\n';
    
    Object.entries(orderList.bySupplier).forEach(([supplier, data]) => {
      data.items.forEach(item => {
        csv += `"${supplier}","${item.code || 'N/A'}","${item.description}",${item.quantity},"${item.unit}",${item.unitPrice},${item.total}\n`;
      });
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `materials-order-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Order list exported",
      description: "CSV file has been downloaded",
    });
  };

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Package className="h-5 w-5 text-elec-yellow" />
            Material Order List
          </CardTitle>
          <Button 
            onClick={handleExportCSV}
            size="sm"
            variant="outline"
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-elec-dark/40 border border-elec-yellow/10">
            <p className="text-xs text-muted-foreground mb-1">Total Items</p>
            <p className="text-xl font-bold text-foreground">{orderList.totalItems}</p>
          </div>
          {orderList.estimatedDelivery && (
            <div className="p-3 rounded-lg bg-elec-dark/40 border border-elec-yellow/10">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Delivery
              </p>
              <p className="text-sm font-semibold text-foreground">{orderList.estimatedDelivery}</p>
            </div>
          )}
        </div>

        {/* Supplier Breakdown */}
        <div className="space-y-4">
          {Object.entries(orderList.bySupplier).map(([supplier, data]) => (
            <div 
              key={supplier}
              className="p-4 rounded-lg bg-elec-dark/40 border border-elec-yellow/10 space-y-3"
            >
              {/* Supplier Header */}
              <div className="flex items-center justify-between pb-3 border-b border-elec-yellow/10">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-elec-yellow" />
                  <h3 className="font-semibold text-foreground">{supplier}</h3>
                  <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
                    {data.items.length} items
                  </Badge>
                </div>
                <p className="font-bold text-elec-yellow">{formatCurrency(data.subtotal)}</p>
              </div>

              {/* Account Info */}
              {data.accountNumber && (
                <div className="text-xs text-muted-foreground italic">
                  💳 {data.accountNumber}
                </div>
              )}

              {/* Items List */}
              <div className="space-y-2">
                {data.items.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{item.description}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
                        {item.code && <span>Code: {item.code}</span>}
                        <span>Qty: {item.quantity} {item.unit}</span>
                        <span>@ {formatCurrency(item.unitPrice)}/{item.unit}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-foreground">{formatCurrency(item.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        {orderList.notes && orderList.notes.length > 0 && (
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
            <p className="text-xs font-semibold text-foreground mb-2">📋 Ordering Notes:</p>
            <ul className="space-y-1">
              {orderList.notes.map((note, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderListPanel;
