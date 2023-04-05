import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getHomeSliderApi } from "../../api/home-slider";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { API_URL } from "../../utils/constans";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = 160;

export default function HomeSlider() {
  const [sliders, setSliders] = useState([]);
  const [sliderActive, setSliderActive] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const response = await getHomeSliderApi();
      setSliders(response.data);
    })();
  }, []);

  // console.log("sliders", JSON.stringify(sliders, null, 4));

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        //onPress={() => console.log(item.attributes.product.data.id)}
        onPress={() => goToProduct(item.attributes.product.data.id)}
      >
        <Image
          style={styles.slider}
          source={{
            uri: `${API_URL}${item.attributes.image.data.attributes.url}`,
          }}
        />
      </TouchableWithoutFeedback>
    );
  };

  const goToProduct = (id) => {
    navigation.push("product-item", { id: id });
  };

  return (
    <View style={styles.container}>
      <Carousel
        loyout={"default"}
        data={sliders}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setSliderActive(index)}
      />
      <Pagination
        dotsLength={sliders.length}
        activeDotIndex={sliderActive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.sliderDots}
        dotStyle={styles.sliderDot}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  slider: {
    width,
    height: height,
    resizeMode: "contain",
  },
  sliderDots: {
    position: "absolute",
    bottom: -20,
    width: "100%",
  },
  sliderDot: {
    backgroundColor: "#fff",
  },
});
