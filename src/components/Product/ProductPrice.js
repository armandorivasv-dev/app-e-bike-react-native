import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { mountNormalize } from "../../utils/functions";

export default function ProductPrice(props) {
  const { price, discount } = props;

  const mountDiscount = (price * discount) / 100;

  return (
    <View>
      {discount && (
        <>
          <Text style={styles.priceOld}>Antes: ${mountNormalize(price)}</Text>
          <Text style={styles.priceDiscount}>
            Ahora (-{discount}%): ${mountNormalize(price - mountDiscount)}
          </Text>
        </>
      )}

      {!discount && (
        <Text style={styles.price}>Precio: ${mountNormalize(price)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  priceOld: {
    textDecorationLine: "line-through",
  },
  priceDiscount: {
    color: "#bc0e0d",
    fontSize: 20,
  },
  price: {
    fontSize: 20,
  },
});
