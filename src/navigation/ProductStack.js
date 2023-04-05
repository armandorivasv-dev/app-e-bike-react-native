import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Product/Home";
import ProductItem from "../screens/Product/ProductItem";
import ProductSearch from "../screens/Product/ProductSearch";

//styles
import colors from "../styles/colors";

export default function ProductStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.bgLight,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: { backgroundColor: colors.bgLight },
      }}
    >
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="product-item"
        component={ProductItem}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="product-search"
        component={ProductSearch}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
