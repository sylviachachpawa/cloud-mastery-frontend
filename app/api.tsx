import axios from "axios";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { CustomersType } from "./types/CustomersType";

export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};

export const getCustomers = async () => {
  const res = await axios.get(`${API_URL}/customers`);
  return res.data;
};

export const addCustomer = async (customer: CustomersType) => {
  const res = await axios.post(`${API_URL}/customers`, customer);
  return res.data;
};

export const getOrders = async () => {
  const res = await axios.get(`${API_URL}/orders`);
  return res.data;
};
export const addOrder = async (order: object) => {
  const res = await axios.post(`${API_URL}/orders`, order);
  return res.data;
};
