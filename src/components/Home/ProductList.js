import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { map } from "lodash";
import { API_URL } from "../../utils/constans";
import { useNavigation } from "@react-navigation/native";

export default function ProductList(props) {
  const { products } = props;

  const navigation = useNavigation();

  //console.log("products===>", JSON.stringify(products, null, 4));

  // navigation.navigate("product-item");

  const goToProduct = (id) => {
    navigation.push("product-item", { id });
  };

  return (
    <View style={styles.container}>
      {map(products, (product) => (
        <TouchableWithoutFeedback
          key={product.id}
          onPress={() => goToProduct(product.id)}
          // onPress={() => console.log("product.id", product.id)}
        >
          <View style={styles.containerProduct}>
            <View style={styles.productItem}>
              <Image
                source={{
                  uri: `${API_URL}${product.attributes.main_image.data.attributes.url}`,
                }}
                style={styles.productImage}
              />
              <Text
                style={styles.productTile}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {product.attributes.title}
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail">
                {product.attributes.description}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  containerProduct: {
    width: "50%",
    padding: 3,
  },
  productItem: {
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  productImage: {
    height: 150,
    resizeMode: "contain",
  },
  productTile: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
  },
});
