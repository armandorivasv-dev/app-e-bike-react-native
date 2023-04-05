import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Button, IconButton } from "react-native-paper";
import React, { useEffect } from "react";
import { API_URL } from "../../utils/constans";
import { mountNormalize, calcPrice } from "../../utils/functions";
import {
  deleteProductCartApi,
  increaseProductCartApi,
  decreaseProductCartApi,
} from "../../api/cart";

//styles
import colors from "../../styles/colors";

export default function CartProduct(props) {
  const { product, setReloadCart } = props;

  const deleteProductCart = async () => {
    const response = await deleteProductCartApi(product.data.id);
    response && setReloadCart(true);
  };

  const increaseProductCart = async () => {
    const response = await increaseProductCartApi(product.data.id);
    response && setReloadCart(true);
  };

  const decreaseProductCart = async () => {
    const response = await decreaseProductCartApi(product.data.id);
    response && setReloadCart(true);
  };

  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `${API_URL}${product.data.attributes.main_image.data.attributes.url} `,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.productInfo}>
        <View>
          <Text
            style={styles.productTitle}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {product.data.attributes.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              $
              {calcPrice(
                product.data.attributes.price,
                product.data.attributes.discount
              )}
            </Text>
            {product.data.attributes.discount && (
              <Text style={styles.oldPrice}>
                ${mountNormalize(product.data.attributes.price)}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <IconButton
            icon="plus"
            iconColor="#fff"
            size={18}
            style={styles.btnQuantity}
            onPress={() => increaseProductCart()}
          />

          <TextInput
            style={styles.inputQuantity}
            value={product.quantity.toString()}
          />
          <IconButton
            icon="minus"
            iconColor="#fff"
            size={18}
            style={styles.btnQuantity}
            onPress={() => decreaseProductCart()}
          />
          <IconButton
            icon="close"
            iconColor="#fff"
            backgroundColor={colors.danger}
            size={18}
            onPress={() => deleteProductCart()}
          />
        </View>

        {/* <View style={styles.buttonContainer}>
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
        </View> */}
      </View>
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
  selectQuantity: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnQuantity: {
    backgroundColor: colors.primary,
  },
  inputQuantity: {
    paddingLeft: 10,
    paddingRight: 5,
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
