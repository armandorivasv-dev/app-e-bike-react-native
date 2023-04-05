import { View, Text, StyleSheet, ScrollView } from "react-native";
import StatusBarCustom from "../../components/StatusBarCustom";
import Search from "../../components/Search";
import React from "react";

//styles
import colors from "../../styles/colors";
import ProductNews from "../../components/Home/ProductNews";
import HomeSlider from "../../components/Home/HomeSlider";

export default function Home() {
  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      <Search />
      <ScrollView>
        <HomeSlider />
        <ProductNews />
        {/* Banner */}
        {/* NewProducts */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
