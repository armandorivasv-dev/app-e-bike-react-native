import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { API_URL } from "../../utils/constans";

const width = Dimensions.get("window").width;

export default function ProductImageCarrusell(props) {
  const [activeImage, setActiveImage] = useState(0);

  const { images } = props;

  //console.log("ProductoImageCarrusel - images", images);

  const renderItem = ({ item }) => {
    return (
      <>
        <Image
          style={styles.carousel}
          source={{ uri: `${API_URL}${item.attributes.url}` }}
        />
      </>
    );
  };

  return (
    <>
      {!images ? (
        <Text>Cargando...</Text>
      ) : (
        <>
          <Carousel
            loyout={"default"}
            data={images}
            sliderWidth={width}
            itemWidth={width}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveImage(index)}
          />
          <Pagination
            dotsLength={images.length}
            activeDotIndex={activeImage}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  carousel: {
    width,
    height: 500,
    resizeMode: "contain",
  },
});
