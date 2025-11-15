"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Address } from "@/store/useAddressStore";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (address: Address) => void;
}

export function AddressModal({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<Address>({
    name: "",
    houseName: "",
    street: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });

  const handleChange = (field: keyof Address, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.city || !form.pincode) return;
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-6 border border-neutral-700 bg-background/95 backdrop-blur-sm max-w-md rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight text-foreground">
            Add Delivery Address
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-foreground">Full Name</Label>
            <Input
              className="bg-muted/40 text-foreground border border-neutral-700 rounded-lg focus-visible:ring-neutral-400"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Your Name"
            />
          </div>

          {/* House Name */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-foreground">House / Flat</Label>
            <Input
              className="bg-muted/40 text-foreground border border-neutral-700 rounded-lg focus-visible:ring-neutral-400"
              value={form.houseName}
              onChange={(e) => handleChange("houseName", e.target.value)}
              placeholder="Example: Lakshmi Villa, B302"
            />
          </div>

          {/* Street */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-foreground">Street</Label>
            <Input
              className="bg-muted/40 text-foreground border border-neutral-700 rounded-lg focus-visible:ring-neutral-400"
              value={form.street}
              onChange={(e) => handleChange("street", e.target.value)}
              placeholder="Street name or landmark"
            />
          </div>

          {/* City & State */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm">City</Label>
              <Input
                className="bg-muted/40 text-foreground border border-neutral-700 rounded-lg focus-visible:ring-neutral-400"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm">State</Label>
              <Input
                className="bg-muted/40 text-foreground border border-neutral-700 rounded-lg focus-visible:ring-neutral-400"
                value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="State"
              />
            </div>
          </div>

          {/* Country & Pincode */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm">Country</Label>
              <Input
                disabled
                value="India"
                className="bg-muted/30 border-neutral-700 text-muted-foreground rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm">Pincode</Label>
              <Input
                className="bg-muted/40 text-foreground border border-neutral-700 rounded-lg focus-visible:ring-neutral-400"
                value={form.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
                placeholder="Postal Code"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full h-11 text-lg tracking-tight font-medium bg-foreground text-background hover:bg-neutral-200 hover:text-black transition-all duration-200"
            onClick={handleSubmit}
          >
            Save Address
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
