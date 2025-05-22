import axios from "axios";
import { base_url } from "../../../Utils/config";

export const getTopRatedProducts = async (user) => {
  try {
    const response = await axios.post(`${base_url}get-top-rated-products`, user);
    return response.data;
  } catch (error) {
    console.error("Error fetching top rated products:", error);
    throw error;
  }
};

export const register = async (user) => {
  try {
    const response = await axios.post(`${base_url}register`, user);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};


