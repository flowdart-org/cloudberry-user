"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Loader, Truck, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { loadRazorpay } from "@/lib/loadRazorpay";
import { ENV } from "@/lib/env";
import { useAddressStore } from "@/store/useAddressStore";
import { useState, useEffect } from "react";
import { AddressModal } from "@/components/address/AddressModal";
import { CART_SERVICES } from "@/api/cart/cart.service";
import { CreateAddressDto, UpdateAddressDto } from "@/api/address/address.dto";

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity, cartLoading } = useCartStore();
  const totalPrice = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  // ---- Address Store Integration ----
  const [showAddressModal, setShowAddressModal] = useState(false);
    const { addresses, fetchAddresses, saveAddress, updateAddress} =
      useAddressStore();
  
    useEffect(() => {
      fetchAddresses();
    }, [fetchAddresses]);
  

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(cartItemId, newQuantity);
  };

  const handleCheckout = async () => {
    if (!addresses[0]) {
      setShowAddressModal(true);
      return;
    }

    const rzpLoaded = await loadRazorpay();
    if (!rzpLoaded) return alert("Failed to load Razorpay");

    try {
      const response = await CART_SERVICES.checkout();
      if (!response.data) throw new Error("Order creation failed.");

      const { id, amount, currency } = response.data;

      const options = {
        key: ENV.RAZORPAY_KEY_ID,
        name: "Cloudberry",
        amount,
        currency,
        description: "Order Payment",
        order_id: id,
        prefill: { name: "Ajmal", contact: "9876543210" },
        theme: { color: "#111827" },

        // handler: async (_res: RazorpaySuccessResponse) => {
        handler: async () => {
          window.location.href = `/order/${id}`;
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
    }
  };

  if(cartLoading) {
     return (<div className="min-h-screen flex flex-col">
        <Header categories={false} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader className="animate-spin" />
          </div>
        </main>
        <Footer />
      </div>)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header categories={false} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground">Add some products to continue.</p>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const onSave = (data: CreateAddressDto | UpdateAddressDto) => {
      if(addresses[0] && addresses[0].id) {
        updateAddress(addresses[0].id, data)
      } else {
        saveAddress(data as CreateAddressDto)
      }
    }
  return (
    <div className="min-h-screen flex flex-col">
      <Header categories={false} />

      <main className="flex-1 bg-background">
        <div className="container px-4 md:px-8 py-8">
          <h1 className="text-2xl md:text-3xl text-foreground mb-6">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ---- Cart Items ---- */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="bg-card border border-border rounded-lg p-4 flex gap-4"
                >
                  <div className="relative w-24 h-28 rounded overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between gap-3">
                      <div>
                        <Link
                href={`/product/${item.product.id}`} className="font-semibold line-clamp-2 text-foreground hover:underline">
                          {item.product.name}
                        </Link>

                        {item.variant && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Size: {item.variant.size}
                          </p>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 z-30"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2 items-center">
                        <Button variant="outline" size="icon" className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-6 text-center font-medium">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <p className="font-bold text-lg">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ---- Address Modal ---- */}
            <AddressModal address={addresses[0]} onSave={onSave} onClose={() => setShowAddressModal(false)} open={showAddressModal} />

            {/* ---- Summary Section ---- */}
            <div className="lg:col-span-1">
              <div className="p-6 bg-card border border-border rounded-lg sticky top-24">
                <div className="flex gap-3 p-4 bg-muted/50 rounded-lg mb-6">
                  <Truck className="h-5 w-5 text-accent mt-1" />

                  <div className="text-sm">
                    <p className="font-semibold">Delivering to:</p>

                    {addresses.length > 0 ? (
                      <p className="text-muted-foreground text-sm leading-tight">
                        {addresses[0].houseNo}, {addresses[0].street} <br />
                        {addresses[0].city}, {addresses[0].state}, {addresses[0].country} - {addresses[0].pincode}
                      </p>
                    ) : (
                      <p className="text-muted-foreground">No address selected.</p>
                    )}

                    <Button
                      variant="link"
                      className="p-0 mt-1 text-accent font-semibold"
                      onClick={() => setShowAddressModal(true)}
                    >
                      {addresses[0] ? "CHANGE" : "ADD ADDRESS"}
                    </Button>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-xl">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Button onClick={handleCheckout} className="w-full h-12 text-lg">
                  PAY ₹{totalPrice}
                </Button>

                <Link href="/shop/all">
                  <Button variant="outline" className="w-full mt-3">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
