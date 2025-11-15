import { paymentApi } from "@/lib/axios";
export const PAYMENT_SERVICES = {
   createOrder: async (amount: number) => {
      const response = await paymentApi.paymentControllerCreateOrder({amount});
      return response.data;
    },

    // createOrder: async (amount: number) => {
    //   const response = await paymentApi.({amount});
    //   return response.data;
    // },


};
