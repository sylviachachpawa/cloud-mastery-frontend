export interface ProductType {
  id: number;
  name: string;
  category: string;
  unit_price: string;
  quantity: number;
  image: string;
  supplier_name?: string;
  status?: string;
}
