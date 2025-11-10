import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileButton } from "@/components/ui/mobile-button";
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
    
    Object.entries(orderList.bySupplier || {}).forEach(([supplier, data]) => {
      const items = data.items || [];
      items.forEach(item => {
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
          <CardTitle className="mobile-heading text-foreground flex items-center gap-2">
            <Package className="h-5 w-5 text-elec-yellow" />
            Material Order List
          </CardTitle>
          <MobileButton 
            onClick={handleExportCSV}
            size="default"
            variant="outline"
            className="border-2 border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </MobileButton>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-elec-dark/40 border-2 border-elec-yellow/10">
            <p className="mobile-small-text text-elec-light mb-2 font-semibold">Total Items</p>
            <p className="text-2xl font-bold text-foreground tabular-nums">{orderList.totalItems}</p>
          </div>
          {orderList.estimatedDelivery && (
            <div className="p-4 rounded-xl bg-elec-dark/40 border-2 border-elec-yellow/10">
              <p className="mobile-small-text text-elec-light mb-2 flex items-center gap-1 font-semibold">
                <Clock className="h-3 w-3" />
                Delivery
              </p>
              <p className="mobile-small-text font-bold text-foreground leading-relaxed">{orderList.estimatedDelivery}</p>
            </div>
          )}
        </div>

        {/* Supplier Breakdown */}
        <div className="space-y-4">
          {Object.entries(orderList.bySupplier || {}).map(([supplier, data]) => (
            <div 
              key={supplier}
              className="p-5 rounded-xl bg-elec-dark/40 border-2 border-elec-yellow/10 space-y-4"
            >
              {/* Supplier Header */}
              <div className="flex items-center justify-between pb-4 border-b border-elec-yellow/10">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-elec-yellow" />
                  <h3 className="mobile-text font-bold text-foreground">{supplier}</h3>
                  <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow mobile-small-text">
                    {data.items?.length || 0} items
                  </Badge>
                </div>
                <p className="mobile-text font-bold text-elec-yellow tabular-nums">{formatCurrency(data.subtotal || 0)}</p>
              </div>

              {/* Account Info */}
              {data.accountNumber && (
                <div className="mobile-small-text text-elec-light italic font-medium">
                  💳 {data.accountNumber}
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                {(data.items || []).map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start justify-between gap-4 p-3 rounded-lg bg-elec-dark/20 border border-elec-yellow/5"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="mobile-text font-semibold text-foreground leading-snug">{item.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mobile-small-text text-elec-light mt-2">
                        {item.code && <span className="font-medium">Code: {item.code}</span>}
                        <span className="font-medium">Qty: {item.quantity} {item.unit}</span>
                        <span className="font-medium">@ {formatCurrency(item.unitPrice)}/{item.unit}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="mobile-text font-bold text-foreground tabular-nums">{formatCurrency(item.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        {orderList.notes && orderList.notes.length > 0 && (
          <div className="p-4 rounded-xl bg-orange-500/10 border-2 border-orange-500/30">
            <p className="mobile-small-text font-bold text-foreground mb-3 flex items-center gap-2">
              <span>📋</span> Ordering Notes:
            </p>
            <ul className="space-y-2">
              {orderList.notes.map((note, idx) => (
                <li key={idx} className="mobile-small-text text-elec-light flex items-start gap-2 leading-relaxed font-medium">
                  <span className="text-orange-400 mt-0.5 font-bold">•</span>
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
