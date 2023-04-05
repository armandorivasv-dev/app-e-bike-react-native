import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import StatusBarCustom from "../components/StatusBarCustom";

import Search from "../components/Search/Search";
import { getFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import ScreenLoading from "../components/ScreenLoading";
import FavoriteList from "../components/Favorites/FavoriteList";

//styles
import colors from "../styles/colors";
import FavoriteNoProduct from "../components/Favorites/FavoriteNoProduct";

export default function Favorites() {
  const [favorites, setFavorites] = useState(null);

  const [reloadFavorites, setReloadFavorites] = useState(false);

  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getFavoriteApi(auth);
        setFavorites(response.data);
      })();
      setReloadFavorites(false);
    }, [reloadFavorites])
  );

  console.log("Favorites-favorites==>", JSON.stringify(favorites, null, 4));

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      <Search />
      <View style={styles.container}>
        {!favorites ? (
          <ScreenLoading text="Cargando lista" />
        ) : favorites.length === 0 ? (
          <FavoriteNoProduct />
        ) : (
          <FavoriteList
            favorites={favorites}
            setReloadFavorites={setReloadFavorites}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
