"use client"
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronRight } from "lucide-react";

const refunds = [
  {
    id: "#REF-2024-001",
    orderId: "#ORD-2024-002",
    date: "Jan 20, 2024",
    status: "Processing",
    amount: "$149.50",
    reason: "Damaged item",
  },
  {
    id: "#REF-2023-045",
    orderId: "#ORD-2023-078",
    date: "Dec 15, 2023",
    status: "Approved",
    amount: "$79.99",
    reason: "Wrong size",
  },
  {
    id: "#REF-2023-032",
    orderId: "#ORD-2023-065",
    date: "Nov 28, 2023",
    status: "Completed",
    amount: "$199.00",
    reason: "ProductDTO defect",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Processing":
      return "bg-secondary text-foreground";
    case "Approved":
      return "bg-accent text-accent-foreground";
    case "Completed":
      return "bg-primary text-primary-foreground";
    default:
      return "bg-secondary text-foreground";
  }
};

export default function RefundsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light tracking-tight mb-2">Refund Requests</h2>
        <p className="text-sm text-neutral-400 ">
          Track your refund and return requests
        </p>
      </div>

      {refunds.length > 0 ? (
        <div className="space-y-4">
          {refunds.map((refund) => (
            <Card key={refund.id} className="p-4 md:p-6 border-border hover:border-foreground/20 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary rounded-sm">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-medium">{refund.id}</p>
                      <Badge className={getStatusColor(refund.status)}>
                        {refund.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-400 ">
                      Order: {refund.orderId}
                    </p>
                    <p className="text-sm text-neutral-400 ">
                      {refund.date} • {refund.reason}
                    </p>
                    <p className="text-lg font-medium">{refund.amount}</p>
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
      ) : (
        <Card className="p-12 border-border text-center">
          <RefreshCw className="h-12 w-12 mx-auto mb-4 text-neutral-400 " />
          <h3 className="text-lg font-medium mb-2">No refund requests</h3>
          <p className="text-sm text-neutral-400 ">
            You haven&apos;t submitted any refund requests yet
          </p>
        </Card>
      )}
    </div>
  );
};
