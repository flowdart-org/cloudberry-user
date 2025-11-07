"use client"

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Truck, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import Image from "next/image";

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal } = useStore();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(productId, newQuantity);
  };

  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header categories />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground">Add some products to get started!</p>
            <Link href="/shop">
              <Button className="">Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header categories />
      
      <main className="flex-1 bg-background">
        <div className="container px-4 md:px-8 py-8">
          <h1 className="text-2xl md:text-3xl  text-foreground mb-6">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="bg-card border border-border rounded-lg p-4 flex gap-4"
                >
                  <div className="relative w-24 h-28 flex-shrink-0 rounded overflow-hidden bg-muted">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground line-clamp-2">
                          {item.product.name}
                        </h3>
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                          {item.size && (
                            <p>
                              <span className="font-medium">Size:</span> {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p>
                              <span className="font-medium">Color:</span> {item.color}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <p className="text-lg font-bold text-foreground">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg mb-6">
                  <Truck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-foreground mb-1">Delivering to:</p>
                    <p className="text-muted-foreground">
                      Ajmal, 673586
                      <br />
                      Kozhikode, Puduppadi, Kerala 6735...
                    </p>
                    <Button variant="link" className="h-auto p-0 text-accent font-semibold mt-2">
                      CHANGE
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">₹{total}</span> 
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-medium">Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-foreground">₹{total}</span>
                  </div>
                </div>

                <Button className="w-full h-12 text-lg font-semibold">
                  PAY ₹{total}
                </Button>

                <Link href="/shop">
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
