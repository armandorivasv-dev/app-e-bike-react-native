import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { getProductItemApi } from "../../api/products";
import ScreenLoading from "../ScreenLoading";
import CartProduct from "./CartProduct";
import { mountNormalize, calcPrice } from "../../utils/functions";

export default function CartList(props) {
  const { cart, products, setProducts, setReloadCart, setTotalPayment } = props;

  // console.log("products in cartlist", JSON.stringify(products, null, 4));

  useEffect(() => {
    setProducts(null);
    (async () => {
      const productsTemp = [];
      let totalPaymentTemp = 0;
      for await (const product of cart) {
        const response = await getProductItemApi(product.idProduct);
        response.quantity = product.quantity;
        productsTemp.push(response);

        totalPaymentTemp +=
          calcPrice(
            response.data.attributes.price,
            response.data.attributes.discount
          ) * response.quantity;
      }
      setProducts(productsTemp);
      setTotalPayment(mountNormalize(totalPaymentTemp));
    })();
  }, [cart]);

  //console.log("CartList.js cart", cart);
  //console.log("CartList.js products", JSON.stringify(products, null, 4));

  return (
    <View style={styles.container}>
      {!products ? (
        <ScreenLoading text="Cargando carrito" />
      ) : (
        <View>
          <Text style={styles.title}>Productos:</Text>

          {map(products, (product) => (
            <CartProduct
              key={product.data.id}
              product={product}
              setReloadCart={setReloadCart}
            />
          ))}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
