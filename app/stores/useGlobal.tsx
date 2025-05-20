import { create } from "zustand";
import { ProductType } from "../types/ProductType";
import { CustomersType } from "../types/CustomersType";
 

type Store = {
  products: ProductType[];
  loading: boolean;
  setProducts: (products: ProductType[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useGlobalStore = create<Store>((set) => ({
  products: [],
  loading: true,
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
}));


type Customer = {
  customers: CustomersType[];
  loading: boolean;
  setCustomers: (products: CustomersType[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useGlobalCustomer = create<Customer>((set) => ({
  customers: [],
  loading: true,
  setCustomers: (customers) => set({ customers }),
  setLoading: (loading) => set({ loading }),
}));