import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, CART } from "../utils/constans";
import { map, filter } from "lodash";

export const getProductCartApi = async () => {
  //await AsyncStorage.removeItem(CART);
  try {
    const cart = await AsyncStorage.getItem(CART);
    if (!cart) {
      return [];
    } else {
      return JSON.parse(cart);
    }
  } catch (error) {
    return null;
  }
};

export const addProductCartApi = async (idProduct, quantity) => {
  try {
    const cart = await getProductCartApi();

    if (!cart) throw "Error al obtener el carrito";

    if (cart.length === 0) {
      cart.push({
        idProduct,
        quantity,
      });
    } else {
      let found = false;

      map(cart, (product) => {
        if (product.idProduct === idProduct) {
          product.quantity += quantity;
          found = true;
          return product;
        }
      });
      if (!found) {
        cart.push({
          idProduct,
          quantity,
        });
      }
    }
    await AsyncStorage.setItem(CART, JSON.stringify(cart));
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteProductCartApi = async (idProduct) => {
  try {
    const cart = await getProductCartApi();

    const newCart = cart.filter((product) => product.idProduct != idProduct);

    await AsyncStorage.setItem(CART, JSON.stringify(newCart));
    return true;
  } catch (error) {
    return null;
  }
};

export const increaseProductCartApi = async (idProduct) => {
  try {
    const cart = await getProductCartApi(idProduct);
    map(cart, (product) => {
      if (product.idProduct === idProduct) {
        return product.quantity++;
      }
    });
    await AsyncStorage.setItem(CART, JSON.stringify(cart));
    return true;
  } catch (error) {
    return null;
  }
};

export const decreaseProductCartApi = async (idProduct) => {
  let isDelete = false;
  try {
    const cart = await getProductCartApi(idProduct);
    map(cart, (product) => {
      if (product.idProduct === idProduct) {
        if (product.quantity === 1) {
          isDelete = true;
          return null; //no se retorma nada
        } else {
          return product.quantity--;
        }
      }
    });
    if (isDelete) {
      await deleteProductCartApi(idProduct);
    } else {
      await AsyncStorage.setItem(CART, JSON.stringify(cart));
    }

    return true;
  } catch (error) {
    return null;
  }
};

export const paymentCartApi = async (auth, tokenStripe, products, address) => {
  try {
    const addressShipping = address;
    delete addressShipping.attributes.createdAt;
    delete addressShipping.attributes.updatedAt;
    delete addressShipping.attributes.publishedAt;

    const url = `${API_URL}/api/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        tokenStripe,
        products,
        idUser: auth.idUser,
        addressShipping,
      }),
    };
    const result = await fetch(url, params);
    //console.log("result in cart.js", result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteCartApi = async () => {
  try {
    await AsyncStorage.removeItem(CART);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};
