import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { getProductItemApi } from "../../api/products";
import StatusBarCustom from "../../components/StatusBarCustom";
import Search from "../../components/Search";
import ScreenLoading from "../../components/ScreenLoading";
import ProductImageCarrusell from "../../components/Product/ProductImageCarrusell";
import { useFocusEffect } from "@react-navigation/native";

//styles
import colors from "../../styles/colors";
import ProductPrice from "../../components/Product/ProductPrice";
import ProductQuantity from "../../components/Product/ProductQuantity";
import ProductBuy from "../../components/Product/ProductBuy";
import ProductFavorite from "../../components/Product/ProductFavorite";

export default function ProductItem(props) {
  const { route } = props;
  const { params } = route;

  const [product, setProduct] = useState(null);

  const [images, setImages] = useState(null);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setProduct(null);
    (async () => {
      const response = await getProductItemApi(params.id);

      //console.log(JSON.stringify(response.data, null, 6));

      setProduct(response.data);

      if (response.data.attributes.carrusel_image.data === null) {
        const arrayImagesMain = [response.data.attributes.main_image.data];
        setImages(arrayImagesMain);
      } else {
        const arrayImagesAll = [response.data.attributes.main_image.data];
        arrayImagesAll.push(...response.data.attributes.carrusel_image.data);
        setImages(arrayImagesAll);
      }
    })();
  }, [params]);

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barstyle="light-content"
      />
      <Search />
      {!product ? (
        <ScreenLoading text="Cargando producto" size="large" />
      ) : (
        <ScrollView style={styles.container}>
          <ProductImageCarrusell images={images} />

          <View style={styles.containerDescription}>
            <Text style={styles.title}>{product.attributes.title}</Text>
            <ProductPrice
              price={product.attributes.price}
              discount={product.attributes.discount}
            />
            <View style={styles.containerBuy}>
              <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
              <View style={styles.productBuy}>
                <ProductBuy product={product} quantity={quantity} />
              </View>
              <View style={styles.productFavorite}>
                <ProductFavorite product={product} />
              </View>
            </View>

            <Text style={styles.description}>Descripción</Text>
            <Text>{product.attributes.description}</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  description: {
    //fontWeight: "bold",
    fontSize: 20,
    paddingTop: 20,
  },
  containerDescription: {
    padding: 10,
  },
  containerBuy: {
    flexDirection: "row",
  },
  productBuy: {
    paddingLeft: 20,
  },
  productFavorite: {
    paddingLeft: 20,
    marginTop: -10,
  },
});
