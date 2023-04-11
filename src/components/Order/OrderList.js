import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { map } from "lodash";
import OrderItem from "./OrderItem";

export default function OrderList(props) {
  const { orders } = props;
  return (
    <View style={styles.container}>
      {map(orders, (order) => (
        //<Text >OrderList</Text>
        <OrderItem key={order.id} order={order} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
  },
  subTitle: {
    fontSize: 16,
  },
});
