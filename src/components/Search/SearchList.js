import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { map } from "lodash";
import { Button } from "react-native-paper";
import { API_URL } from "../../utils/constans";
import { mountNormalize } from "../../utils/functions";
import { useNavigation } from "@react-navigation/native";

//styles
import colors from "../../styles/colors";

export default function SearchList(props) {
  const { products } = props;
  //console.log("SearchList - products===>", JSON.stringify(products, null, 4));

  const navigation = useNavigation();

  const calcutatePrice = (price, discount) => {
    if (!discount) return mountNormalize(price);

    const discountAmount = (price * discount) / 100;
    return mountNormalize(price - discountAmount);
  };

  const goTpProduct = (id) => {
    navigation.navigate("product-item", { id });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleScreen}>Resultados</Text>
      {map(products, (product) => (
        <TouchableWithoutFeedback
          key={product.id}
          onPress={() => goTpProduct(product.id)}
        >
          <View style={styles.product}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `${API_URL}${product.attributes.main_image.data.attributes.url}`,
                }}
                style={styles.image}
              />
            </View>

            <View style={styles.productInfo}>
              <Text
                style={styles.productTitle}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {product.attributes.title}
              </Text>
              <View style={styles.prices}>
                <Text style={styles.currentPrice}>
                  $
                  {calcutatePrice(
                    product.attributes.price,
                    product.attributes.discount
                  )}
                </Text>
                <Text style={styles.oldPrice}>
                  ${mountNormalize(product.attributes.price)}
                </Text>
              </View>
              <Button
                style={styles.button}
                buttonColor={colors.primary}
                textColor={colors.fontLight}
              >
                VER PRODUCTO
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  titleScreen: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
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
  button: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 10,
  },
});
