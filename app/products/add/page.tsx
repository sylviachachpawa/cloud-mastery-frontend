"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FolderOpenIcon, TrashIcon } from "@heroicons/react/24/solid";
import NavigationTitleBar from "@/app/components/common/NavigationTitleBar";

export default function AddProduct() {
  const [form, setForm] = useState({
    product_name: "",
    description: "",
    price: "",
    category: "",
    cost: "",
    profit: "",
    quantity: "",
    weight: "",
    weightUnit: "kg",
    supplier_name: "Flatlay Carpets",
  });

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selected = Array.from(files);

    if (selected.length + images.length > 2) {
      alert("You can only upload up to 2 images.");
      return;
    }

    const newImages = [...images, ...selected];
    const newPreviews = newImages.map((file) => URL.createObjectURL(file));

    setImages(newImages);
    setPreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  // Auto-calculate profit
  useEffect(() => {
    const price = parseFloat(form.price);
    const cost = parseFloat(form.cost);

    if (!isNaN(price) && !isNaN(cost)) {
      setForm((prev) => ({
        ...prev,
        profit: (price - cost).toFixed(2),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        profit: "",
      }));
    }
  }, [form.price, form.cost]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const MAX_CHARS = 1000;

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/addProduct", form);
      console.log("Product added:", res.data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4">
        {/* PRODUCT DETAILS */}
        <div className=" flex items-center gap-4">
          <NavigationTitleBar title="" showBack={true} />
          <h2 className="text-xl font-semibold text-gray-700">
            Add new product
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow max-w-3xl mx-auto p-6 space-y-8">
          <div className="border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3">
              Product Details
            </h2>
            <div className="space-y-4 mb-4">
              <input
                type="text"
                name="product_name"
                placeholder="Item name"
                value={form.product_name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              />
              <textarea
                name="description"
                placeholder="Description"
                rows={3}
                maxLength={MAX_CHARS}
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 resize-none"
              />

              <div className="text-sm text-gray-500 mt-1 text-right">
                {form.description.length}/{MAX_CHARS} characters
              </div>
            </div>
          </div>
          {/* IMAGES */}
          <div className="border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3">
              Images
            </h2>

            <div className="w-full p-6 border border-gray-300 rounded-md bg-gray-100 flex flex-col items-center justify-center text-gray-500 text-sm mb-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="upload"
              />
              <label
                htmlFor="upload"
                className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded bg-white shadow-sm text-gray-700 hover:bg-gray-50"
              >
                <FolderOpenIcon className="w-4 h-4" /> Upload
              </label>
              <span className="mt-2">Images (max 2)</span>

              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4 w-full">
                  {previews.map((src, i) => (
                    <div key={i} className="relative group">
                      <Image
                        width={200}
                        height={200}
                        src={src}
                        alt={`preview-${i}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* PRICING */}
          <div className="border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3">
              Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="number"
                name="price"
                placeholder="Item price"
                value={form.price}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              />
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              > 
              </input>
              <input
                type="number"
                name="cost"
                placeholder="Cost per item"
                value={form.cost}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              />
              <input
                type="text"
                name="profit"
                placeholder="Profit (auto-calc.)"
                value={form.profit}
                disabled
                className="p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              />
            </div>
          </div>
          {/* INVENTORY */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3">
              Inventory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  name="weight"
                  placeholder="Weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                />
                <select
                  name="weightUnit"
                  value={form.weightUnit}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
              
            </div>
          </div>
          {/* BUTTON */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="cursor-pointer bg-sky-200 hover:bg-sky-300 text-sky-800 font-medium py-2 px-6 rounded-full transition-transform"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
