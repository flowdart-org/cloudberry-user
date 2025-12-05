"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAddressStore } from "@/store/useAddressStore";
import { AddressModal } from "@/components/address/AddressModal";
import { CreateAddressDto, UpdateAddressDto } from "@/api/address/address.dto";

export default function AddressesTab() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const { addresses, fetchAddresses, saveAddress, updateAddress} =
    useAddressStore();

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const onSave = (data: CreateAddressDto | UpdateAddressDto) => {
    if(addresses[0] && addresses[0].id) {
      updateAddress(addresses[0].id, data)
    } else {
      saveAddress(data as CreateAddressDto)
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-light tracking-tight mb-2">Saved Addresses</h2>
          <p className="text-sm text-neutral-400 ">Manage your shipping addresses</p>
        </div>
        <Button className="bg-black" onClick={() => setShowAddressModal(true)}>
          Add Address
        </Button>

        <AddressModal address={addresses[0]} onSave={onSave} onClose={() => setShowAddressModal(false)} open={showAddressModal}  />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.length === 0 ? (
          <p className="text-neutral-400  text-sm">No saved addresses.</p>
        ) : (
          addresses.map((address) => (
            <Card
              key={address.id}
              className={`p-6 border ${
                address.isPrimary ? "border-primary" : "border-border"
              } rounded-lg`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-neutral-400 " />
                    <span className="font-medium">{"Address"}</span>
                  </div>

                  {address.isPrimary && (
                    <Badge variant="secondary" className="text-xs">
                      Default
                    </Badge>
                  )}
                </div>

                {/* Details */}
                <div className="text-sm space-y-1">
                  <p className="text-neutral-400 ">
                    {address.houseNo}, {address.street}
                  </p>
                  <p className="text-neutral-400 ">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-neutral-400 ">{address.country}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <AddressModal address={address} open={showAddressModal} onSave={onSave} onClose={() => setShowAddressModal(false)} />

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    // onClick={() => deleteAddress(address.id)}
                  >
                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                    Remove
                  </Button>
                </div>

                {/* {!address.isPrimary && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                    // onClick={() => setDefaultAddress(address.id)}
                  >
                    Set as Default
                  </Button>
                )} */}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
