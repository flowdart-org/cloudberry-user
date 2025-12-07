"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CreateAddressDto } from "@/api/address/address.dto";
import { toast } from "sonner";

interface Props {
  address?: CreateAddressDto;
  open: boolean;
  onClose: () => void;
  onSave: (address: CreateAddressDto) => void;
}

export function AddressModal({ address, open, onClose, onSave }: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CreateAddressDto>(
    address ?? {
      houseNo: "",
      street: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
    }
  );

  const handleChange = (field: keyof CreateAddressDto, value: string) => {
  value = value.replace(/^\s+/, ""); // remove leading spaces only

  if (field === "pincode") {
    // block negative sign & limit to 6 digits
    value = value.replace(/\D/g, "").slice(0, 6);
  }

  setForm((prev) => ({ ...prev, [field]: value }));
};


  const validate = () => {
  const houseNo = (form.houseNo ?? "").trim();
  const street = (form.street ?? "").trim();
  const city = (form.city ?? "").trim();
  const state = (form.state ?? "").trim();
  const country = (form.country ?? "").trim();
  const pincode = (form.pincode ?? "").trim();

  if (!houseNo) return "House/Flat number is required";
  if (!street) return "Street is required";
  if (!city) return "City is required";
  if (!state) return "State is required";
  if (!country) return "Country is required";

  if (!/^\d{6}$/.test(pincode)) 
    return "Pincode must be a 6-digit number";

  return null;
};

  const handleSubmit = () => {
    const error = validate();
    if (error) return toast.error(error);

    setLoading(true);
    onSave(form);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-6 bg-background border border-border rounded-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {address ? "Edit Address" : "Add Delivery Address"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {/* House Number */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium">House / Flat No *</Label>
            <Input
              value={form.houseNo}
              onChange={(e) => handleChange("houseNo", e.target.value)}
              placeholder="House No or Apartment"
            />
          </div>

          {/* Street */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium">Street *</Label>
            <Input
              value={form.street}
              onChange={(e) => handleChange("street", e.target.value)}
              placeholder="Street name / Landmark"
            />
          </div>

          {/* City + State */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">City *</Label>
              <Input
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">State *</Label>
              <Input
                value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="State"
              />
            </div>
          </div>

          {/* Country + Pincode */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Country *</Label>
              <Input
                value={form.country}
                placeholder="Country" disabled
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Pincode *</Label>
              <Input
                type="number"
                value={form.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
                placeholder="6-digit pin"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            disabled={loading}
            className="w-full h-11 text-base font-medium"
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Save Address"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
