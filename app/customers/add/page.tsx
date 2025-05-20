"use client";

import { useState } from "react";
import axios from "axios";
import NavigationTitleBar from "@/app/components/common/NavigationTitleBar";

export default function AddCustomer() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/addCustomer", form);
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
            Add new customer
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow max-w-3xl mx-auto p-6 space-y-8">
          <div className="border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3">
              Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <input
                type="text"
                name="first_name"
                placeholder="First name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last name"
                value={form.last_name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              />
             
            </div>
          </div>
          <div className="border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-900 uppercase mb-3">
              Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
             
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              />
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              >
                <option defaultValue="" hidden>Select</option>
                <option value="Kenya">Kenya</option>
                <option value="South Africa">South Africa</option>
                <option value="Uganda">Uganda</option>
              </select>
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="cursor-pointer bg-sky-200 hover:bg-sky-300 text-sky-800 font-medium py-2 px-6 rounded-full transition-transform"
            >
              Add Customer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
