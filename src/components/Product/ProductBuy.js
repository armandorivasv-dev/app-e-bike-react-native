import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import React, { useEffect } from "react";
import { addProductCartApi, getProductCartApi } from "../../api/cart";
import Toast from "react-native-root-toast";

//styles
import { formStyle } from "../../styles";

export default function ProductBuy(props) {
  const { product, quantity } = props;

  // useEffect(() => {
  //   (async () => {
  //     console.log("cart", await getProductCartApi());
  //   })();
  // }, []);

  // console.log("product===>", JSON.stringify(product, null, 4));

  const addProductCart = async () => {
    const response = await addProductCartApi(product.id, quantity);
    if (response) {
      Toast.show("Producto añadido al carrito", {
        position: Toast.positions.CENTER,
      });
    } else {
      Toast.show("Error al añadir producto al carrito", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <View style={{ zIndex: 1 }}>
      <Button
        mode="contained"
        style={formStyle.btnSucces}
        onPress={addProductCart}
      >
        AGREGAR AL CARRITO
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
