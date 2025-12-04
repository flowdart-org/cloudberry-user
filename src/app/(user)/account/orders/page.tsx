"use client"
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OrderResponseDto } from "@/api/client";
import { ORDER_SERVICES } from "@/api/order/order.service";
import { formatDate } from "@/lib/utils";

// const orders = [
//   {
//     id: "ORD-2024-001",
//     date: "Jan 15, 2024",
//     status: "Delivered",
//     total: "$299.99",
//     items: 3,
//   },
//   {
//     id: "ORD-2024-002",
//     date: "Jan 10, 2024",
//     status: "In Transit",
//     total: "$149.50",
//     items: 1,
//   },
//   {
//     id: "ORD-2023-089",
//     date: "Dec 28, 2023",
//     status: "Delivered",
//     total: "$89.99",
//     items: 2,
//   },
// ];

export default function OrdersTab()  {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await ORDER_SERVICES.getOrdersByUser()
      if(response.data) {
        setOrders(response.data)
      }
    }
    fetchOrders()
  }, [])
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light tracking-tight mb-2">Order History</h2>
        <p className="text-sm text-neutral-400 ">
          View and track your orders
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-4 md:p-6 border-border hover:border-foreground/20 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-medium">{order.orderNumber}</p>
                    <Badge 
                      variant={order.orderStatus === "Delivered" ? "default" : "secondary"}
                      className={order.orderStatus === "Delivered" ? "bg-primary text-primary-foreground" : ""}
                    >
                      {order.orderStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-400 ">
                    {formatDate(order.placedAt as string)} • {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                  <p className="text-lg font-medium">{order.total}</p>
                </div>
             <Button variant="outline" asChild className="self-start md:self-center">
  <Link href={`/order/${order.id}`}>
    View Details
    <ChevronRight className="ml-2 h-4 w-4" />
  </Link>
</Button>

            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
