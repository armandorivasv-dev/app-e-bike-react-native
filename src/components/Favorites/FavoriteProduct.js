import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { API_URL } from "../../utils/constans";
import { Button, IconButton } from "react-native-paper";
import { mountNormalize } from "../../utils/functions";
import { useNavigation } from "@react-navigation/native";
import { deleteFavoriteApi } from "../../api/favorite";
import useAuth from "../../hooks/useAuth";

//styles
import colors from "../../styles/colors";

export default function FavoriteProduct(props) {
  const { favorite, setReloadFavorites } = props;

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const { auth } = useAuth();

  const calcutatePrice = (price, discount) => {
    if (!discount) return mountNormalize(price);

    const discountAmount = (price * discount) / 100;
    return mountNormalize(price - discountAmount);
  };

  const goTpProduct = (id) => {
    navigation.navigate("product-item", { id });
  };

  const deleteFavorite = async (id) => {
    setLoading(true);
    await deleteFavoriteApi(auth, id);
    setReloadFavorites(true);
    setLoading(false);
  };

  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `${API_URL}${favorite.attributes.product.data.attributes.main_image.data.attributes.url}`,
          }}
        />
      </View>
      <View style={styles.productInfo}>
        <View>
          <Text
            style={styles.productTitle}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {favorite.attributes.product.data.attributes.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              $
              {calcutatePrice(
                favorite.attributes.product.data.attributes.price,
                favorite.attributes.product.data.attributes.discount
              )}
            </Text>
            <Text style={styles.oldPrice}>
              $
              {mountNormalize(
                favorite.attributes.product.data.attributes.price
              )}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            buttonColor={colors.primary}
            textColor={colors.fontLight}
            onPress={() => goTpProduct(favorite.attributes.product.data.id)}
          >
            VER PRODUCTO
          </Button>
          <IconButton
            icon="close"
            iconColor="#fff"
            backgroundColor={colors.primary}
            size={16}
            onPress={() => deleteFavorite(favorite.attributes.product.data.id)}
          />
        </View>
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#dadde1",
  },
  imageContainer: {
    width: "40%",
    height: 200,
    backgroundColor: "#ebebeb",
    padding: 5,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  productInfo: {
    padding: 10,
    width: "50%",
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: 16,
  },
  prices: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 5,
  },
  currentPrice: {
    fontSize: 14,
  },
  oldPrice: {
    fontSize: 12,
    marginLeft: 7,
    color: "#747474",
    textDecorationLine: "line-through",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
  },
  button: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 10,
  },
  loading: {
    backgroundColor: "#000",
    opacity: 0.4,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
