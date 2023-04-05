import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function SearchNotFound(props) {
  const { search } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>No hay resultados para: "{search}"</Text>
      <Text>Intente buscar un termino diferente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  subTitle: { fontSize: 14 },
});
