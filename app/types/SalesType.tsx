import { CustomersType } from "./CustomersType";
import { ProductType } from "./ProductType";

export interface SalesType {
  id: number;
  items: ProductType[];
  customer: CustomersType;
  status: string; // e.g., "pending", "completed", "shipped", "cancelled"
  payment_method: string;
  shipping_address?: ShippingAddressType;
  date: string;
  total_amount: string; 
} 

export interface ShippingAddressType {
  street: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
}