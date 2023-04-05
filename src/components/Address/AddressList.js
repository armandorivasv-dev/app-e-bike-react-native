import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { map } from "lodash";
import { Button } from "react-native-paper";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

//styles
import colors from "../../styles/colors";
import { formStyle } from "../../styles";
import { deleteAddressApi } from "../../api/address";

export default function AddressList(props) {
  const { addresses, setReloadAdress } = props;

  const { auth } = useAuth();

  const navigation = useNavigation();

  const deleteAddressAlert = (address) => {
    Alert.alert(
      "Eliminanto dirección",
      `¿Estas seguro que deseas eiminar la direccion "${address.attributes.title}"?`,
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: () => deleteAddress(address.id),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAddress = async (idAddress) => {
    try {
      await deleteAddressApi(auth, idAddress);
      setReloadAdress(true);
    } catch (error) {
      console.log(error);
    }
  };

  const goToUpdateAddress = (idAddress) => {
    navigation.navigate("add-address", { idAddress });
  };

  return (
    <View style={styles.container}>
      {map(addresses.data, (address) => (
        <View key={address.id} style={styles.address}>
          <Text style={styles.title}>{address.attributes.title}</Text>
          <Text>{address.attributes.name_lastname}</Text>
          <Text>{address.attributes.address}</Text>
          <View style={styles.blockLine}>
            <Text>{address.attributes.state}, </Text>
            <Text>{address.attributes.city}, </Text>
            <Text>{address.attributes.postal_code}</Text>
          </View>
          <Text>{address.attributes.country}</Text>
          <View style={styles.actions}>
            <Button
              mode="contained"
              style={formStyle.btnSucces}
              onPress={() => goToUpdateAddress(address.id)}
            >
              Editar
            </Button>
            <Button
              mode="contained"
              style={formStyle.btnSucces}
              onPress={() => deleteAddressAlert(address)}
            >
              Eliminar
            </Button>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  address: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  blockLine: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
});
