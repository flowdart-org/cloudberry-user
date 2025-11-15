import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  name: string;
  houseName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

interface AddressState {
  address: Address | null;
  setAddress: (address: Address) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      address: null,
      setAddress: (address) => set({ address }),
    }),
    { name: "user-address" }
  )
);
