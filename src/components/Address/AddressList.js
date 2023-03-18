import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { map } from "lodash";

export default function AddressList(props) {
  const { addresses } = props;

  console.log("AddressList - addresses ===>", addresses.data);

  return (
    <View style={styles.container}>
      {map(addresses, (address) => (
        <Text key={address.id}>{address.data.id}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});
