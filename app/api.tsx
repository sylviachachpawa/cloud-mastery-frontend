import axios from "axios";
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