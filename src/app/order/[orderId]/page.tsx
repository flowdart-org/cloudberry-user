"use client"
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Link } from "lucide-react";
import { useParams } from "next/navigation";

const OrderDetails = () => {
  const { orderId } = useParams();

  const order = {
    id: orderId,
    confirmationNumber: "6500600",
    transactionId: "1806790905",
    date: "Feb 17, 2025",
    expectedDelivery: "Feb 22 - 26",
    status: "ordered",
    product: {
      name: "Premium Cotton T-Shirt",
      image: "/placeholder.svg",
      size: "M",
      quantity: 1,
      price: 16.85,
    },
    shipping: {
      name: "John Doe",
      address: "600 Montgomery St",
      city: "San Francisco",
      state: "CA",
      zip: "94111",
      country: "United States",
    },
    payment: {
      method: "Credit card",
      subtotal: 16.85,
      tax: 1.50,
      shipping: 8.12,
      total: 26.47,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header categories />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/profile">
          <Button variant="ghost" className="mb-6 -ml-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
        </Link>

        {/* Confirmation Header */}
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl font-bold mb-4">Woohoo! Your order is confirmed.</h1>
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Zen Fashion Studio</span> will start working on this right away.
            <br />
            We'll email you as soon as it ships.
          </p>
        </div>

        {/* Order Status Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto mb-8">
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-2 relative z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-medium">Ordered</p>
              <p className="text-xs text-muted-foreground">on {order.date}</p>
            </div>
            
            <div className="flex-1 h-0.5 bg-muted -mt-14" />
            
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full border-2 border-muted bg-background flex items-center justify-center mb-2 relative z-10" />
              <p className="text-sm font-medium">Ready to ship</p>
            </div>
            
            <div className="flex-1 h-0.5 bg-muted -mt-14" />
            
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full border-2 border-muted bg-background flex items-center justify-center mb-2 relative z-10" />
              <p className="text-sm font-medium">Expected delivery</p>
              <p className="text-xs text-muted-foreground">{order.expectedDelivery}</p>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <Button size="lg" className="rounded-full">View your order</Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Delivery times are estimated. If you're experiencing difficulty with this order, please{" "}
            <button className="underline hover:text-foreground">contact the seller</button>.{" "}
            <button className="underline hover:text-foreground">See more info</button>.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Order details</h2>
            <p className="text-sm text-muted-foreground">
              Confirmation number: <span className="font-medium text-foreground">{order.confirmationNumber}</span>
            </p>
          </div>

          {/* Product Info */}
          <div className="flex gap-6 pb-6 border-b mb-6">
            <img
              src={order.product.image}
              alt={order.product.name}
              className="w-24 h-24 object-cover rounded-md bg-muted"
            />
            <div className="flex-1">
              <h3 className="font-semibold mb-2">{order.product.name}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Transaction ID: {order.transactionId}</p>
                <p>SIZE: {order.product.size}</p>
                <p>Quantity: {order.product.quantity}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">${order.product.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Shipping & Payment Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            {/* Shipping Address */}
            <div>
              <h3 className="font-semibold mb-3">Shipping address</h3>
              <div className="text-sm space-y-1">
                <p>{order.shipping.name}</p>
                <p>{order.shipping.address}</p>
                <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
                <p>{order.shipping.country}</p>
              </div>
            </div>

            {/* Payment Summary */}
            <div>
              <h3 className="font-semibold mb-3">Paid with <span className="font-normal">{order.payment.method}</span></h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${order.payment.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales tax</span>
                  <span className="font-medium">${order.payment.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">${order.payment.shipping.toFixed(2)}</span>
                </div>
                <div className="text-xs text-muted-foreground">USPS Priority Mail</div>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-6 border-t">
            <span className="text-lg font-semibold">Total (1 item)</span>
            <span className="text-3xl font-bold">${order.payment.total.toFixed(2)}</span>
          </div>

          {/* Environmental Note */}
          <div className="mt-6 pt-6 border-t flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
            </svg>
            <span>Zen Fashion Studio offsets carbon emissions from every delivery</span>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetails;
