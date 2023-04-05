import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, List, IconButton } from "react-native-paper";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../api/favorite";
import useAuth from "../../hooks/useAuth";

//styles
import colors from "../../styles/colors";

export default function ProductFavorite(props) {
  const { product } = props;

  const [isFavorite, setIsFavorite] = useState(null);

  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth, product.id);

      if (response.data.length > 0) setIsFavorite(true);

      // console.log(
      //   "ProductoFavorite - response =>",
      //   JSON.stringify(response, null, 4)
      // );
    })();
  }, [product]);

  const addProductFavorite = async () => {
    await addFavoriteApi(auth, product.id);
    setIsFavorite(true);
    // console.log("Agregado a favorito:", product.attributes.title);
  };

  const deleteProductFavorite = async () => {
    await deleteFavoriteApi(auth, product.id);
    setIsFavorite(null);
    // console.log("Borrando de favorito:", product.attributes.title);
  };

  return (
    <>
      {/* <IconButton
        icon="heart"
        onPress={deleteProductFavorite}
        size={40}
        iconColor="#0098d3"
      />

      <IconButton
        icon="heart"
        onPress={addProductFavorite}
        size={40}
        iconColor="#9a9a9a"
      /> */}
      {isFavorite ? (
        <IconButton
          icon="heart"
          onPress={deleteProductFavorite}
          size={40}
          iconColor="#0098d3"
        />
      ) : (
        <IconButton
          icon="heart"
          onPress={addProductFavorite}
          size={40}
          iconColor="#9a9a9a"
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({});
