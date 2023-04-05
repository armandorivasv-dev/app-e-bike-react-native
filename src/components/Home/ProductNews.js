import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { getProductLastApi } from "../../api/products";
import ProductList from "./ProductList";

export default function ProductNews() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getProductLastApi();
      // console.log(JSON.stringify(response.data, null, 2));
      setProducts(response.data);
    })();
  }, []);

  //console.log("products ===>", JSON.stringify(products, null, 2));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevos Productos</Text>
      {products ? (
        <ProductList products={products} />
      ) : (
        <Text>No hay productos...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
});
