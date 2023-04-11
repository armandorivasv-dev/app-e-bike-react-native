import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import StatusBarCustom from "../../components/StatusBarCustom";
import { getOrdersApi } from "../../api/order";
import useAuth from "../../hooks/useAuth";
import { map, size } from "lodash";
import { useFocusEffect } from "@react-navigation/native";
import OrderList from "../../components/Order/OrderList";

//styles
import colors from "../../styles/colors";

export default function Orders() {
  const { auth } = useAuth();
  const [orders, setOrders] = useState(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getOrdersApi(auth);
        setOrders(response.data);
      })();
    }, [])
  );

  // console.log("orders", JSON.stringify(orders, null, 4));

  return (
    <>
      <StatusBarCustom />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Mis pedidos</Text>

        {!orders ? (
          <ActivityIndicator size="large" style={styles.title} />
        ) : size(orders) === 0 ? (
          <Text style={styles.subTitle}>No tienes pedidos</Text>
        ) : (
          <OrderList orders={orders} />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
  },
  subTitle: {
    fontSize: 16,
  },
});
