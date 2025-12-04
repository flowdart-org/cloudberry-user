import { create } from "zustand";
import { ADDRESS_SERVICES } from "@/api/address/address.service";
import { User } from "@/types/user.types";
import { toast } from "sonner";
import { USER_SERVICES } from "@/api/user/user.service";
import { Address } from "@/types/address.types";
import { CreateAddressDto, UpdateAddressDto } from "@/api/address/address.dto";


interface AddressState {
  user: User | null;
  addresses: Address[];
  defaultAddress: Address | null;
  loading: boolean;

  // Actions
  fetchAddresses: () => Promise<void>;
  saveAddress: (data: CreateAddressDto) => Promise<void>;
  updateAddress: (id: string, data: UpdateAddressDto) => Promise<void>;
}

export const useAddressStore = create<AddressState>((set, get) => ({
  user: null,
  addresses: [],
  defaultAddress: null,
  loading: false,

  // ---- Fetch user + addresses ----
  fetchAddresses: async () => {
    try {
      set({ loading: true });
      const res = await USER_SERVICES.me();

      if (res?.data) {
        const addresses = res.data.addresses || [];

        set({
          user: res.data,
          addresses,
          defaultAddress: addresses.find((a: any) => a.isDefault) || addresses[0] || null,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load addresses.");
    } finally {
      set({ loading: false });
    }
  },

  // ---- Create Address ----
  saveAddress: async (data) => {
    try {
      console.log('reached save addrss')
      set({ loading: true });
      const res = await ADDRESS_SERVICES.createAddress(data);

      if (res.data) {
        toast.success("Address added successfully");
        set({ user: res.data });
        await get().fetchAddresses();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save address.");
    } finally {
      set({ loading: false });
    }
  },

  // ---- Update Address ----
  updateAddress: async (id, data) => {
    try {
      set({ loading: true });
      const res = await ADDRESS_SERVICES.updateAddress(id, data);

      if (res.data) {
        toast.success("Address updated successfully");
        set({ user: res.data });
        await get().fetchAddresses();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update address.");
    } finally {
      set({ loading: false });
    }
  },
}));
