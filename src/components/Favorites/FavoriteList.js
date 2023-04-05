import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { map } from "lodash";
import FavoriteProduct from "./FavoriteProduct";

export default function FavoriteList(props) {
  const { favorites, setReloadFavorites } = props;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>LIstado de Favoritos</Text>
      {map(favorites, (favorite) => (
        <FavoriteProduct
          key={favorite.id}
          favorite={favorite}
          setReloadFavorites={setReloadFavorites}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
});
