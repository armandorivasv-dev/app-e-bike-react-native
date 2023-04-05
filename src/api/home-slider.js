import { API_URL } from "../utils/constans";

export const getHomeSliderApi = async () => {
  try {
    const url = `${API_URL}/api/home-sliders?populate=*`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
