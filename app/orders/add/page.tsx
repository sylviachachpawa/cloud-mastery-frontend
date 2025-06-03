"use client";

import { useState, useMemo } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import NavigationTitleBar from "@/app/components/common/NavigationTitleBar";
import { FaPlusSquare } from "react-icons/fa";
import { useGlobalCustomer, useGlobalStore } from "@/app/stores/useGlobal";
import { addOrder } from "@/app/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  itemTotal: number;
}

export default function AddOrders() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | "">("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [orderDate, setOrderDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const { customers } = useGlobalCustomer();
  const { products } = useGlobalStore();
  const router = useRouter();
  const [items, setItems] = useState<OrderItem[]>([
    { productId: "", quantity: 1, unitPrice: 0, itemTotal: 0 },
  ]);

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { productId: "", quantity: 1, unitPrice: 0, itemTotal: 0 },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const item = newItems[index];

      if (field === "productId") {
        const product = products.find((p) => String(p.id) === value);
        item.productId = value as string;

        if (product) {
          const unitPrice = parseFloat(product.unitCost);
          item.unitPrice = unitPrice;
          item.itemTotal = unitPrice * item.quantity;
        } else {
          item.unitPrice = 0;
          item.itemTotal = 0;
        }
      } else if (field === "quantity") {
        const qty = Math.max(1, Number(value));
        item.quantity = qty;
        item.itemTotal = item.unitPrice * qty;
      }

      return newItems;
    });
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.itemTotal, 0);
  }, [items]);

  const grandTotal = useMemo(() => {
    const discountAmount = subtotal * (discountPercentage / 100);
    return subtotal - discountAmount;
  }, [subtotal, discountPercentage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     if (
      !selectedCustomerId ||
      !paymentMethod ||
      !orderDate ||
      items.length === 0 ||
      items.some((item) => !item.productId || item.quantity <= 0)
    ) {
      toast.error("⚠️ Please fill all customer details and add at least one valid item with quantity.");
      return;
    }

    const orderItemsForSubmission = items.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitCost: item.unitPrice,
      };
    });

    const orderData = {
      customerId: selectedCustomerId,
      orderAmount: parseFloat(grandTotal.toFixed(2)),
      orderDate: new Date(orderDate).toISOString(),
      paymentMethod: paymentMethod,
      shippingAddress: "Nairobi, Kenya",
      items: orderItemsForSubmission,
    };

    try {
      await addOrder(orderData);
      toast.success("Order added successfully.");
      router.push("/orders");
    } catch (error) {
      console.error("Error adding order:", error);
      alert("Something went wrong! Check console for details.");
    }
  };

  return (
    <div className="mx-auto p-6 space-y-4">
      <form onSubmit={handleSubmit} className="">
        <div className=" flex items-center gap-4 mb-4">
          <NavigationTitleBar title="" showBack={true} />
          <h2 className="text-xl font-semibold text-gray-700">
            Record new order
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow  mx-auto p-6 space-y-8">
          {/* CUSTOMER DETAILS */}
          <div className="border-b border-gray-200 pb-6">
            {" "}
            {/* Added padding bottom */}
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3">
              Customer Details
            </h2>
            <div className="space-y-4 mb-4">
              {/* Customer Name input/select */}
              <select
                name="customer_id"
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(String(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              >
                <option value="">Select Customer Name</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {`${customer.firstName} ${customer.lastName}`}
                  </option>
                ))}
              </select>

              {/* Payment Method select */}
              <select
                name="payment_method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              >
                <option value="">Select payment method</option>
                <option value="MPESA">Mpesa</option>
                <option value="VISA">VISA Card</option>
                <option value="MASTERCARD">Master Card</option>
                <option value="PAYPAL">Paypal</option>
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
              </select>

              {/* Date of order input */}
              <input
                type="date"
                name="order_date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              />
            </div>
          </div>

          {/* ITEMS SECTION */}
          <div className="border-b border-gray-200 pb-6">
            {" "}
            {/* Added padding bottom */}
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3 ">
              Items
            </h2>
            {/* Table Header for Items */}
            <div className="grid grid-cols-6 gap-4 font-semibold text-gray-700 mb-2 text-xs">
              <span className="col-span-2 uppercase">Item Name</span>
              <span className="col-span-1 text-center uppercase">QTY</span>
              <span className="col-span-1 text-right uppercase">Price</span>
              <span className="col-span-1 text-right uppercase">Total</span>
              <span className="col-span-1 text-center uppercase">Action</span>
            </div>
            {/* Item Rows */}
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 items-center mb-4"
              >
                {/* Item Name Select */}
                <div className="col-span-2">
                  <select
                    value={item.productId}
                    onChange={(e) =>
                      handleItemChange(index, "productId", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                  >
                    <option value="">Select Item Name</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity Input */}
                <div className="col-span-1">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    min="1"
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 text-center"
                  />
                </div>

                {/* Price Display (read-only) */}
                <div className="col-span-1">
                  <input
                    type="text"
                    value={`KES ${item.unitPrice.toFixed(2)}`}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 text-right"
                  />
                </div>

                {/* Item Total Display (read-only) */}
                <div className="col-span-1">
                  <input
                    type="text"
                    value={`KES ${item.itemTotal.toFixed(2)}`}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 font-semibold text-right"
                  />
                </div>

                {/* Action Button (Remove Item) */}
                <div className="col-span-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
            {/* Add Item Button */}
            <button
              type="button"
              onClick={handleAddItem}
              className="text-green-600 hover:text-green-800 font-semibold text-sm mt-2 items-center cursor-pointer"
            >
              Add Item <FaPlusSquare className="inline ml-1" />
            </button>
          </div>

          {/* TOTALS SECTION */}
          <div className="flex flex-col items-end space-y-4">
            <div className="flex justify-between w-full max-w-xs">
              <span className="font-semibold text-gray-700">Subtotal</span>
              <span className="font-semibold text-gray-900">
                KES {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between w-full max-w-xs items-center">
              <label htmlFor="discount" className="font-semibold text-gray-700">
                Add discount
              </label>
              <input
                type="number"
                id="discount"
                value={discountPercentage}
                onChange={(e) =>
                  setDiscountPercentage(
                    Math.max(0, Math.min(100, Number(e.target.value)))
                  )
                } // Clamp between 0 and 100
                className="w-20 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 text-right"
                placeholder="0%"
                min="0"
                max="100"
              />
              <span className="font-semibold text-gray-900">%</span>
            </div>

            <div className="flex justify-between w-full max-w-xs pt-2 border-t border-gray-200">
              <span className="font-bold text-gray-900 text-lg">
                Grand total
              </span>
              <span className="font-bold text-gray-900 text-lg">
                KES {grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Record Order Button */}
          <div className="flex justify-end pt-6">
            {" "}
            {/* Added padding top */}
            <button
              type="submit"
              className="flex items-center space-x-2 bg-sky-200 hover:border hover:bg-sky-200  hover:border-sky-300 text-sky-900 font-medium py-2 px-3 rounded-md transition cursor-pointer"
            >
              Add Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
