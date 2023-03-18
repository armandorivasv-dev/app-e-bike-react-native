import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { IconButton } from "react-native-paper";
import { getAddressesApi } from "../../api/address";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { size } from "lodash";
import AddressList from "../../components/Address/AddressList";

export default function Address() {
  const { auth } = useAuth();

  const natigation = useNavigation();

  const [addresses, setAddresses] = useState(""); //segun el curso el valor inicial es null

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getAddressesApi(auth);
        setAddresses(response);
      })();
    }, [])
  );

  //console.log("addresses--->", addresses);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mis direcciones</Text>
      <TouchableWithoutFeedback
        onPress={() => natigation.navigate("add-address")}
      >
        <View style={styles.addAddress}>
          <Text style={styles.addAddressText}>Añadir una direccion</Text>
          <IconButton icon="arrow-right" color="#000" size={19} />
        </View>
      </TouchableWithoutFeedback>

      {!addresses.data ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : size(addresses.data) === 0 ? (
        <Text>Crea tu primera direccion</Text>
      ) : (
        <>
          <Text style={styles.noAddressText}>Listado de direcciones</Text>
          <AddressList addresses={addresses} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  addAddress: {
    borderWidth: 0.9,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addAddressText: {
    fontSize: 16,
  },
  loading: {
    marginTop: 20,
  },
  noAddressText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
