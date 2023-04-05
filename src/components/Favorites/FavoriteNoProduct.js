import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function FavoriteNoProduct() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No hay productos en favoritos!!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
  },
});
