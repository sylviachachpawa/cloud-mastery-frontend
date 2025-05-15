import { create } from "zustand";

type Product = {
  id: number;
  name: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  color: string;
  size: string;
};

type Store = {
  products: Product[];
  loading: boolean;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useGlobalStore = create<Store>((set) => ({
  products: [],
  loading: true,
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
}));