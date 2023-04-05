import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useEffect } from "react";
import { map } from "lodash";
import ScreenLoading from "../ScreenLoading";

//styles
import colors from "../../styles/colors";

export default function CartAddressesList(props) {
  const { addresses, selectedAddress, setSelectedAddress } = props;

  useEffect(() => {
    addresses && setSelectedAddress(addresses[0]);
  }, [addresses]);

  // console.log("addresses", JSON.stringify(addresses, null, 4));

  // console.log("selectedAddress", JSON.stringify(selectedAddress, null, 4));

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Direccion de envio</Text>

      {!addresses && <ScreenLoading text="Cargando direcciones" />}

      {map(addresses, (address) => (
        <TouchableWithoutFeedback
          key={address.id}
          onPress={() => setSelectedAddress(address)}
        >
          <View
            style={[
              styles.address,
              address.id === selectedAddress?.id && styles.checked, //coloca interrogante para validar que el id existe
            ]}
          >
            <Text style={styles.title}>{address.attributes.title}</Text>
            <Text>{address.attributes.name_lastname}</Text>
            <Text>{address.attributes.address}</Text>
            <View style={styles.blockLine}>
              <Text>{address.attributes.state}, </Text>
              <Text>{address.attributes.city}, </Text>
              <Text>{address.attributes.postal_code}.</Text>
            </View>
            <Text>{address.attributes.country}</Text>
            <Text>Teléfono: {address.attributes.postal_code}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    padding: 20,
  },
  containerTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  blockLine: {
    flexDirection: "row",
  },
  checked: {
    borderColor: colors.primary,
    backgroundColor: "#0098d330",
  },
});
