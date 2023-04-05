import { API_URL } from "../utils/constans";

export const getProductLastApi = async (limit = 10) => {
  try {
    // const url = `${API_URL}/api/products?_limit=${limit}&_sort=createAt:DESC`;
    const url = `${API_URL}/api/products?sort[createdAt]=DESC&pagination[limit]=${limit}&populate=*`;
    const params = {
      method: "GET",
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getProductItemApi = async (id) => {
  //console.log("idProduct", idProduct);
  try {
    const url = `${API_URL}/api/products/${id}?populate=*`;

    const params = {
      method: "GET",
    };

    const response = await fetch(url, params);
    const result = await response.json();
    // console.log("result", result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
