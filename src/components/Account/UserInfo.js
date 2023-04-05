import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Menu from "./Menu";

export default function UserInfo(props) {
  const { user } = props;
  //console.log("UserInfo - user -->", user);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, </Text>
      <Text style={styles.titleName}>
        {user.name && user.lastname
          ? `${user.name} ${user.lastname} `
          : user.email}
      </Text>
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    heigth: 100,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  titleName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
