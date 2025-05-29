"use client";

import { useState, useMemo } from "react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/solid";
import NavigationTitleBar from "@/app/components/common/NavigationTitleBar";
 import { FaPlusSquare } from "react-icons/fa";
import { useGlobalCustomer, useGlobalStore } from "@/app/stores/useGlobal";

interface SaleItem {
  productId: number | "";
  quantity: number;
  unitPrice: number;
  itemTotal: number;
}

export default function AddSales() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | "">("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [saleDate, setSaleDate] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const { customers } = useGlobalCustomer();
  const { products } = useGlobalStore();

  const [items, setItems] = useState<SaleItem[]>([
    { productId: "", quantity: 1, unitPrice: 0, itemTotal: 0 },
  ]);
  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { productId: "", quantity: 1, unitPrice: 0, itemTotal: 0 },
    ]);
  };

  // Function to remove an item row
  const handleRemoveItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Handle changes for individual item rows
  const handleItemChange = (
    index: number,
    field: keyof SaleItem,
    value: string | number
  ) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const item = newItems[index];

      if (field === "productId") {
        const product = products.find((p) => p.id === Number(value));
        if (product) {
          const priceValue = parseFloat(product.unitCost.replace("KES ", ""));
          item.productId = Number(value);
          item.unitPrice = priceValue;
        } else {
          item.productId = "";
          item.unitPrice = 0;
        }
      } else if (field === "quantity") {
        item.quantity = Math.max(1, Number(value));
      }

      item.itemTotal = item.quantity * item.unitPrice;

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

    // Basic validation
    if (
      !selectedCustomerId ||
      !paymentMethod ||
      !saleDate ||
      items.length === 0 ||
      items.some((item) => !item.productId || item.quantity <= 0)
    ) {
      alert(
        "Please fill all customer details and add at least one valid item with quantity."
      );
      return;
    }

    const saleItemsForSubmission = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        productName: product?.name,
      };
    });

    const saleData = {
      customer_id: selectedCustomerId,
      payment_method: paymentMethod,
      date: saleDate,
      items: saleItemsForSubmission,
      discount_percentage: discountPercentage,
      subtotal_amount: subtotal.toFixed(2),
      grand_total_amount: grandTotal.toFixed(2),
    };

    try {
      const res = await axios.post("/api/addSale", saleData);
      console.log("Sale added:", res.data);
      alert("Sale added successfully!");
      // Optionally reset form
      setSelectedCustomerId("");
      setPaymentMethod("");
      setSaleDate("");
      setDiscountPercentage(0);
      setItems([{ productId: "", quantity: 1, unitPrice: 0, itemTotal: 0 }]);
    } catch (error) {
      console.error("Error adding sale:", error);
      alert("Something went wrong! Check console for details.");
    }
  };

  return (
    <div className="mx-auto p-6 space-y-4">
      <form onSubmit={handleSubmit} className="">
        <div className=" flex items-center gap-4 mb-4">
          <NavigationTitleBar title="" showBack={true} />
          <h2 className="text-xl font-semibold text-gray-700">
            Record new sale
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
                <option value="Mpesa">Mpesa</option>
                <option value="Bank_Transfer">Bank Transfer</option>
                <option value="Mobile_Money">Mobile Money</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
              </select>

              {/* Date of Sale input */}
              <input
                type="date"
                name="sale_date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
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
            <div className="grid grid-cols-6 gap-4 font-semibold text-gray-700 mb-2">
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
              className="text-green-600 hover:text-green-800 font-semibold text-sm mt-2 items-center"
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

          {/* Record Sale Button */}
          <div className="flex justify-end pt-6">
            {" "}
            {/* Added padding top */}
            <button
              type="submit"
              className="cursor-pointer bg-sky-200 hover:bg-sky-300 text-sky-800 font-medium py-2 px-6 rounded-full transition-transform"
            >
              Record Sale
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
