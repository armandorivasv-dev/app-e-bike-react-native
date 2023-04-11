import { API_URL } from "../utils/constans";

export const getOrdersApi = async (auth) => {
  try {
    const url = `${API_URL}/api/orders?user=${auth.idUser}&populate[product][populate]=main_image`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
