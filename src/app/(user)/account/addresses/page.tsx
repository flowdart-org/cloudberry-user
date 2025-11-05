"use client"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Edit, Trash2 } from "lucide-react";

const addresses = [
  {
    id: 1,
    type: "Home",
    isDefault: true,
    name: "John Doe",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
  },
  {
    id: 2,
    type: "Work",
    isDefault: false,
    name: "John Doe",
    street: "456 Business Ave",
    city: "New York",
    state: "NY",
    zip: "10002",
    country: "United States",
  },
];

export default function AddressesTab () {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-light tracking-tight mb-2">Saved Addresses</h2>
          <p className="text-sm text-muted-foreground">
            Manage your shipping and billing addresses
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 self-start sm:self-center">
          <Plus className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card key={address.id} className="p-6 border-border relative">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{address.type}</span>
                </div>
                {address.isDefault && (
                  <Badge variant="secondary" className="text-xs">
                    Default
                  </Badge>
                )}
              </div>
              
              <div className="text-sm space-y-1">
                <p className="font-medium">{address.name}</p>
                <p className="text-muted-foreground">{address.street}</p>
                <p className="text-muted-foreground">
                  {address.city}, {address.state} {address.zip}
                </p>
                <p className="text-muted-foreground">{address.country}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="mr-2 h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
