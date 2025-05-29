import axios from "axios";
import { CustomersType } from "./types/CustomersType";
export const API_URL = "https://cloud-mastery-backend-151675025616.us-central1.run.app/api/v1";

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