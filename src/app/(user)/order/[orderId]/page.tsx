"use client"
import { ORDER_SERVICES } from "@/api/order/order.service";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import StatusProgress from "@/components/orders/StatusProgress";
import ProductMiniCard from "@/components/product/ProductMiniCard";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { downloadInvoicePDF } from "@/lib/invoice-generator";
import { useToast } from "@/hooks/useToast";
import { ArrowLeft, Download, Package, Truck, MapPin, CreditCard, Clock } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderResponseDto } from "@/api/order/order.dto";

export default function OrderDetails() {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState<OrderResponseDto | null>(null)
    const [isDownloading, setIsDownloading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const getOrderDetails = async () => {
            const response = await ORDER_SERVICES.getOrderDetails(orderId as string)
            if (response.data) {
                setOrderDetails(response.data)
            }
        }
        getOrderDetails()
    }, [orderId])

    const handleDownloadInvoice = async () => {
        try {
            setIsDownloading(true);
            if (orderDetails) {
                downloadInvoicePDF(orderDetails);
                toast({
                    title: "Success",
                    description: "Invoice prepared for download. Use your browser's print dialog to save as PDF.",
                });
            }
        } catch (err) {
            console.error(err)
            toast({
                title: "Error",
                description: "Failed to generate invoice",
                variant: "destructive",
            });
        } finally {
            setIsDownloading(false);
        }
    }

    if (!orderDetails) return null

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 w-full">
                <div className="container w-screen mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    {/* Back Button */}
                    <Link href="/account/orders">
                        <button className="group flex items-center gap-2 text-sm text-neutral-400 hover:text-foreground transition-colors mb-8">
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Orders
                        </button>
                    </Link>

                    {/* Page Header */}
                    <div className="mb-6 pb-4 border-b border-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-muted rounded-lg">
                                <Package className="h-5 w-5 text-neutral-400" />
                            </div>
                            <span className="text-xs font-medium tracking-widest text-neutral-400 uppercase">
                                Order Details
                            </span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-neutral-400">
                                order ID: 
                            </p>
                        </div>
                            <h1 className="md:text-lg text-md font-semibold tracking-tight">
                                {orderDetails.orderNumber}
                            </h1>
                    </div>

                    {/* Layout */}
                        <div className="grid lg:grid-cols-3 gap-6">
                        {/* LEFT CONTENT */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* STATUS CARD */}
                            <div className="p-4 sm:p-6 bg-card border border-border rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b border-border">
                                    <h2 className="font-semibold text-base">Delivery Status</h2>
                                    <span className="text-xs font-medium tracking-wide px-3 py-1.5 bg-foreground text-background rounded-full w-fit">
                                        {orderDetails.orderStatus}
                                    </span>
                                </div>

                                <StatusProgress status={orderDetails.orderStatus} />

                                <div className="mt-6 pt-4 border-t border-border space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-neutral-400">Estimated Delivery:</span>
                                        <span className="text-sm font-medium text-foreground">Dec 5, 2024</span>
                                    </div>
                                    <div className="flex gap-2">
                                    {orderDetails.orderStatus === 'delivered' && <Button className="w-full" size="default">
                                        <Truck className="mr-2 h-4 w-4" />
                                       Return Request
                                    </Button>}
                                    {orderDetails.orderStatus === 'processing' &&<Button className="w-full" size="default">
                                        <Truck className="mr-2 h-4 w-4" />
                                        Cancel Order
                                    </Button>}
                                   { (orderDetails.orderStatus === 'pending' || orderDetails.orderStatus === 'processing' || orderDetails.orderStatus === 'processing') && <Button className="w-full" size="default">
                                        <Truck className="mr-2 h-4 w-4" />
                                        Track Package
                                    </Button>}
                                    </div>
                                </div>
                            </div>

                            {/* PRODUCTS SECTION */}
                            <div className="space-y-3">
                                <div className="pb-3 border-b border-border">
                                    <h2 className="font-semibold text-base">Items ({orderDetails.items.length})</h2>
                                </div>
                                <div className="space-y-2">
                                    {orderDetails.items.map((item, index) => (
                                        <div key={index} style={{ animationDelay: `${0.2 + index * 0.05}s` }}>
                                            <ProductMiniCard item={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* DELIVERY ADDRESS */}
                            <div className="p-4 sm:p-6 bg-card border border-border rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.4s" }}>
                                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                                    <div className="p-2 bg-muted rounded-lg">
                                        <MapPin className="h-5 w-5 text-neutral-400" />
                                    </div>
                                    <h2 className="font-semibold text-lg">Delivery Address</h2>
                                </div>
                                <div className="text-sm space-y-2">
                                    <div>
                                        <p className="text-neutral-400 text-xs uppercase tracking-wide mb-1">Name</p>
                                        <p className="font-medium text-foreground">{orderDetails.customer?.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-neutral-400 text-xs uppercase tracking-wide mb-1">Phone</p>
                                        <p className="text-foreground">{orderDetails.customer?.phone || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-neutral-400 text-xs uppercase tracking-wide mb-1">Email</p>
                                        <p className="text-foreground break-all">{orderDetails.customer?.email || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* PAYMENT & ORDER INFO */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                                <div className="p-4 sm:p-6 bg-card border border-border rounded-lg">
                                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border">
                                        <div className="p-2 bg-muted rounded-lg">
                                            <CreditCard className="h-5 w-5 text-neutral-400" />
                                        </div>
                                        <h3 className="font-semibold">Payment</h3>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <p className="text-neutral-400 text-xs uppercase tracking-wide mb-1">Method</p>
                                            <p className="text-foreground">
                                                {orderDetails.paymentMethod ? (
                                                    typeof orderDetails.paymentMethod === 'object'
                                                        ? (orderDetails.paymentMethod as any).method || 'Online Payment'
                                                        : 'Online Payment'
                                                ) : 'Pending'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-neutral-400 text-xs uppercase tracking-wide mb-1">Status</p>
                                            <p className="text-foreground font-medium">{orderDetails.paymentStatus}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6 bg-card border border-border rounded-lg">
                                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border">
                                        <div className="p-2 bg-muted rounded-lg">
                                            <Clock className="h-5 w-5 text-neutral-400" />
                                        </div>
                                        <h3 className="font-semibold">Timeline</h3>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <p className="text-neutral-400 text-xs uppercase tracking-wide mb-1">Placed</p>
                                            <p className="text-foreground">{formatDate(orderDetails.placedAt as string)}</p>
                                        </div>
                                        {orderDetails.deliveredAt && (
                                            <div>
                                                <p className="text-neutral-400 text-xs uppercase tracking-wide mb-1">Delivered</p>
                                                <p className="text-foreground">{formatDate(orderDetails.deliveredAt)}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR — ORDER SUMMARY */}
                        <div className="space-y-6">
                            {/* SUMMARY CARD */}
                            <div className="p-6 sm:p-8 bg-card border border-border rounded-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                                <h2 className="font-semibold text-lg mb-6 pb-4 border-b border-border">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-neutral-400">Subtotal</span>
                                        <span className="font-medium">₹{orderDetails.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-neutral-400">Shipping</span>
                                        <span className="font-medium">₹{orderDetails.shippingCharge.toFixed(2)}</span>
                                    </div>
                                    {orderDetails.discount > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-neutral-400">Discount</span>
                                            <span className="text-green-500 font-medium">-₹{orderDetails.discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center pt-6 border-t border-border">
                                    <span className="font-semibold text-foreground">Total</span>
                                    <span className="text-2xl font-semibold text-foreground">₹{orderDetails.total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* ACTIONS CARD */}
                            <div className="p-6 sm:p-8 bg-card border border-border rounded-xl animate-fade-in space-y-3" style={{ animationDelay: "0.3s" }}>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    size="lg"
                                    onClick={handleDownloadInvoice}
                                    disabled={isDownloading}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    {isDownloading ? 'Downloading...' : 'Download Invoice'}
                                </Button>
                            </div>

                            {/* ORDER INFO CARD */}
                            <div className="p-6 sm:p-8 bg-muted border border-border rounded-xl text-sm space-y-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                                <div className="space-y-1">
                                    <p className="text-neutral-400 text-xs uppercase tracking-wide">Order Number</p>
                                    <p className="font-mono font-medium text-foreground break-all">{orderDetails.orderNumber}</p>
                                </div>
                                <div className="pt-3 border-t border-border space-y-1">
                                    <p className="text-neutral-400 text-xs uppercase tracking-wide">Order Date</p>
                                    <p className="text-foreground">{formatDate(orderDetails.placedAt as string)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </main>

            <Footer />
        </div>
    );
}


