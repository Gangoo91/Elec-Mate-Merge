import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { 
  Package, 
  Truck, 
  Store, 
  Wrench, 
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail
} from "lucide-react";
import { useMaterialOrders, useSuppliers, useUpdateOrderStatus } from "@/hooks/useFinance";
import { CreateOrderDialog } from "@/components/employer/dialogs/CreateOrderDialog";
import { CreateSupplierDialog } from "@/components/employer/dialogs/CreateSupplierDialog";
import { companyTools } from "@/data/employerMockData";
import type { MaterialOrder, Supplier } from "@/services/financeService";

export function ProcurementSection() {
  const [activeTab, setActiveTab] = useState("orders");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showSupplierDialog, setShowSupplierDialog] = useState(false);

  const { data: materialOrders = [], isLoading: ordersLoading } = useMaterialOrders();
  const { data: suppliers = [], isLoading: suppliersLoading } = useSuppliers();
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const isLoading = ordersLoading || suppliersLoading;

  const pendingOrders = materialOrders.filter(o => o.status === "Processing" || o.status === "In Transit").length;
  const toolsDuePAT = companyTools.filter(t => {
    if (!t.patDue) return false;
    const daysUntil = Math.ceil((new Date(t.patDue).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30 && daysUntil > 0;
  }).length;
  const toolsDueCalibration = companyTools.filter(t => {
    if (!t.nextCalibration) return false;
    const daysUntil = Math.ceil((new Date(t.nextCalibration).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30 && daysUntil > 0;
  }).length;

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Badge className="bg-success text-success-foreground text-xs">{status}</Badge>;
      case "In Transit":
        return <Badge className="bg-info text-info-foreground text-xs">{status}</Badge>;
      case "Processing":
        return <Badge className="bg-warning text-warning-foreground text-xs">{status}</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
    }
  };

  const getToolStatusBadge = (status: string) => {
    switch (status) {
      case "In Use":
        return <Badge className="bg-success text-success-foreground text-xs">{status}</Badge>;
      case "Available":
        return <Badge className="bg-info text-info-foreground text-xs">{status}</Badge>;
      case "On Hire":
        return <Badge className="bg-warning text-warning-foreground text-xs">{status}</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <SectionHeader title="Procurement" description="Materials, suppliers, and equipment" />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-32 shrink-0" />
          ))}
        </div>
        <Skeleton className="h-10 w-full" />
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Procurement"
        description="Materials, suppliers, and equipment"
      />

      {/* Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Truck className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-foreground">{pendingOrders}</p>
              <p className="text-xs text-muted-foreground">Pending Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Store className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{suppliers.length}</p>
              <p className="text-xs text-muted-foreground">Suppliers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Wrench className="h-4 w-4 text-warning" />
            <div>
              <p className="text-lg font-bold text-foreground">{toolsDuePAT + toolsDueCalibration}</p>
              <p className="text-xs text-muted-foreground">Tools Due</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="orders" className="text-xs">Orders</TabsTrigger>
          <TabsTrigger value="suppliers" className="text-xs">Suppliers</TabsTrigger>
          <TabsTrigger value="tools" className="text-xs">Equipment</TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="mt-4 space-y-4">
          <Button className="w-full md:w-auto" onClick={() => setShowOrderDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>

          <div className="space-y-3">
            {materialOrders.map((order) => {
              const isExpanded = expandedItem === order.id;
              const items = order.items as any[];

              return (
                <Card key={order.id} className="bg-elec-gray border-border overflow-hidden">
                  <CardContent className="p-0">
                    <div 
                      className="p-4 cursor-pointer touch-feedback"
                      onClick={() => setExpandedItem(isExpanded ? null : order.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground text-sm">{order.order_number}</h3>
                            {getOrderStatusBadge(order.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{order.suppliers?.name || 'Unknown'}</p>
                          <p className="text-xs text-muted-foreground">Stock Order</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-foreground">£{Number(order.total).toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.order_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center mt-2">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-border p-4 bg-muted/30 space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Items</h4>
                          <div className="space-y-1">
                            {items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {item.qty}x {item.name}
                                </span>
                                <span className="font-medium">£{(item.qty * item.price).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Ordered by: {order.ordered_by || 'Unknown'}</span>
                          {order.delivery_date && (
                            <span>Delivery: {new Date(order.delivery_date).toLocaleDateString()}</span>
                          )}
                        </div>

                        {order.status === "In Transit" && (
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateOrderStatusMutation.mutate({ 
                                id: order.id, 
                                status: "Delivered", 
                                deliveryDate: new Date().toISOString().split('T')[0] 
                              });
                            }}
                            disabled={updateOrderStatusMutation.isPending}
                          >
                            Mark as Delivered
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Suppliers Tab */}
        <TabsContent value="suppliers" className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-elec-gray border-border"
            />
          </div>

          <div className="space-y-3">
            {suppliers
              .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((supplier) => {
                const isExpanded = expandedItem === supplier.id;

                return (
                  <Card key={supplier.id} className="bg-elec-gray border-border overflow-hidden">
                    <CardContent className="p-0">
                      <div 
                        className="p-4 cursor-pointer touch-feedback"
                        onClick={() => setExpandedItem(isExpanded ? null : supplier.id)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground">{supplier.name}</h3>
                            <Badge variant="outline" className="text-xs mt-1">{supplier.category}</Badge>
                          </div>
                          <div className="text-right shrink-0">
                            <Badge className="bg-success text-success-foreground text-xs">
                              {Number(supplier.discount_percent)}% off
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {supplier.delivery_days === 0 ? "Same day" : `${supplier.delivery_days} day delivery`}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-center mt-2">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-border p-4 bg-muted/30 space-y-3">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Account:</span>
                              <span className="ml-2 font-medium">{supplier.account_number || '-'}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Credit Limit:</span>
                              <span className="ml-2 font-medium">£{Number(supplier.credit_limit).toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Balance:</span>
                              <span className="ml-2 font-medium">£{Number(supplier.balance).toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Contact:</span>
                              <span className="ml-2 font-medium">{supplier.contact_name || '-'}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Phone className="h-4 w-4 mr-2" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Mail className="h-4 w-4 mr-2" />
                              Email
                            </Button>
                            <Button size="sm" className="flex-1">
                              <Plus className="h-4 w-4 mr-2" />
                              Order
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        {/* Equipment Tab - still uses mock data for tools */}
        <TabsContent value="tools" className="mt-4 space-y-4">
          <div className="flex gap-2">
            <Button className="flex-1 md:flex-none">
              <Plus className="h-4 w-4 mr-2" />
              Add Tool
            </Button>
          </div>

          <div className="space-y-3">
            {companyTools.map((tool) => {
              const isExpanded = expandedItem === tool.id;

              return (
                <Card key={tool.id} className="bg-elec-gray border-border overflow-hidden">
                  <CardContent className="p-0">
                    <div 
                      className="p-4 cursor-pointer touch-feedback"
                      onClick={() => setExpandedItem(isExpanded ? null : tool.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-sm">{tool.name}</h3>
                          <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{tool.assignedTo}</p>
                        </div>
                        {getToolStatusBadge(tool.status)}
                      </div>

                      <div className="flex justify-center mt-2">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-border p-4 bg-muted/30 space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {tool.serialNumber && (
                            <div>
                              <span className="text-muted-foreground">Serial:</span>
                              <span className="ml-2 font-medium text-xs">{tool.serialNumber}</span>
                            </div>
                          )}
                          {tool.purchasePrice > 0 && (
                            <div>
                              <span className="text-muted-foreground">Value:</span>
                              <span className="ml-2 font-medium">£{tool.purchasePrice}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                          <Button size="sm" className="flex-1">Log Service</Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <FloatingActionButton
        icon={<Plus className="h-5 w-5" />}
        onClick={() => activeTab === "suppliers" ? setShowSupplierDialog(true) : setShowOrderDialog(true)}
        label={activeTab === "suppliers" ? "Add Supplier" : "New Order"}
      />

      <CreateOrderDialog 
        open={showOrderDialog} 
        onOpenChange={setShowOrderDialog} 
      />
      
      <CreateSupplierDialog 
        open={showSupplierDialog} 
        onOpenChange={setShowSupplierDialog} 
      />
    </div>
  );
}
