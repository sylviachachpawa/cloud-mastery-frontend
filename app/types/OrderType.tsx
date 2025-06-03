export interface OrderItemType {
  id: string;
  productId: string;
  productName: string;
  unitCost: string;
  quantity: number;
  totalCost: string;
}

export interface OrderType {
  id: string;
  customerId: string;
  customerName: string;
  orderNumber: string | null;
  orderAmount: string;
  orderDate: string; // ISO string
  description: string | null;
  paymentMethod: string; // e.g., "CARD"
  shippingAddress: string;
  status: "pending" | "completed" | "shipped" | "cancelled"; // status types
  createdAt: string;
  updatedAt: string;
  items: OrderItemType[];
}
