import AsyncStorage from "@react-native-async-storage/async-storage";
import { SEARCH_HISTORY, API_URL } from "../utils/constans";
import { sortArrayByDate } from "../utils/functions";

export const getHistotySearchApi = async () => {
  //await AsyncStorage.removeItem(SEARCH_HISTORY);
  try {
    const history = await AsyncStorage.getItem(SEARCH_HISTORY);
    if (!history) return [];
    return sortArrayByDate(JSON.parse(history));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateHistorySearchApi = async (search) => {
  const history = await getHistotySearchApi();

  if (history.length > 2) history.pop();

  history.push({ search, date: new Date() });

  await AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
};

export const searchProductApi = async (search) => {
  try {
    const url = `${API_URL}/api/products?filters[$or][0][title][$contains]=${search}&filters[$or][1][description][$contains]=${search}&filters[$or][2][tags][$contains]=${search}&filters[$or][3][category][$contains]=${search}&populate=*`;

    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
