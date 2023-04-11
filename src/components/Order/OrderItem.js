import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { API_URL } from "../../utils/constans";
import { tail } from "lodash";

export default function OrderItem(props) {
  const { order } = props;
  console.log("order", JSON.stringify(order, null, 4));

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{
            uri: `${API_URL}${order.attributes.product.data.attributes.main_image.data.attributes.url}`,
          }}
        />
      </View>

      <View style={styles.containerInfo}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {order.attributes.product.data.attributes.title}
        </Text>
        <Text>Pedido Nro.: {order.attributes.id_payment}</Text>
        <Text>Cantidad: {order.attributes.product_quantity}</Text>
        <Text>Pagado: {order.attributes.product_payment}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: -20,
    paddingVertical: 5,
    flexDirection: "row",
  },
  containerImage: {
    width: "30%",
    height: 120,
    padding: 10,
  },
  containerInfo: {
    width: "70%",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
});
