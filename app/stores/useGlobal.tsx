import { create } from "zustand";
import { ProductType } from "../types/ProductType";
import { CustomersType } from "../types/CustomersType";
import { OrderType } from "../types/OrderType";
  

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
  setCustomers: (customers: CustomersType[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useGlobalCustomer = create<Customer>((set) => ({
  customers: [],
  loading: true,
  setCustomers: (customers) => set({ customers }),
  setLoading: (loading) => set({ loading }),
}));

type Order = {
  orders: OrderType[];
  loading: boolean;
  setOrders: (orders: OrderType[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useGlobalSale = create<Order>((set) => ({
  orders: [],
  loading: true,
  setOrders: (orders) => set({ orders }),
  setLoading: (loading) => set({ loading }),
}));