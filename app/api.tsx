import axios from "axios";
import { CustomersType } from "./types/CustomersType";
export const API_URL =  process.env.NEXT_PUBLIC_API_URL

export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/products`);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getCustomers = async () => {
  try {
    const res = await axios.get(`${API_URL}/customers`);
    return res.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};

export const addCustomer = async (customer: CustomersType) => {
  try {
    const res = await axios.post(`${API_URL}/customers`, customer);
    return res.data;
  } catch (error) {
    console.error("Error adding customer:", error);
    return null;
  }
};

export const getOrders = async () => {
  try {
    const res = await axios.get(`${API_URL}/orders`);
    return res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

// add order
export const addOrder = async (order: object) => {
  try {
    const res = await axios.post(`${API_URL}/orders`, order);
    return res.data;
  } catch (error) {
    console.error("Error adding order:", error);
    return null;
  }
};

