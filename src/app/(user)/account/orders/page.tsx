"use client"
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, ChevronRight } from "lucide-react";

const orders = [
  {
    id: "#ORD-2024-001",
    date: "Jan 15, 2024",
    status: "Delivered",
    total: "$299.99",
    items: 3,
  },
  {
    id: "#ORD-2024-002",
    date: "Jan 10, 2024",
    status: "In Transit",
    total: "$149.50",
    items: 1,
  },
  {
    id: "#ORD-2023-089",
    date: "Dec 28, 2023",
    status: "Delivered",
    total: "$89.99",
    items: 2,
  },
];

export default function OrdersTab()  {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light tracking-tight mb-2">Order History</h2>
        <p className="text-sm text-muted-foreground">
          View and track your orders
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-4 md:p-6 border-border hover:border-foreground/20 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-sm">
                  <Package className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-medium">{order.id}</p>
                    <Badge 
                      variant={order.status === "Delivered" ? "default" : "secondary"}
                      className={order.status === "Delivered" ? "bg-primary text-primary-foreground" : ""}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.date} • {order.items} {order.items === 1 ? 'item' : 'items'}
                  </p>
                  <p className="text-lg font-medium">{order.total}</p>
                </div>
              </div>
              <Button variant="outline" className="self-start md:self-center">
                View Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
