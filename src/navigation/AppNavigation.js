import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import ProductStack from "./ProductStack";
import Favorites from "../screens/Favorites";
import Cart from "../screens/Cart";
import AccountStack from "./AccountStack";
//styles
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={styles.navigation}
        screenOptions={({ route }) => ({
          tabBarIcon: (routeStatus) => {
            return setIcon(route, routeStatus);
          },
        })}
      >
        <Tab.Screen
          name="product-stack"
          component={ProductStack}
          options={{
            title: "Inicio",
            tabBarActiveTintColor: "#e91e63",
          }}
        />
        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{
            title: "Favoritos",
          }}
        />
        <Tab.Screen
          name="cart"
          component={Cart}
          options={{
            title: "Carrito",
          }}
        />
        <Tab.Screen
          name="account-stack"
          component={AccountStack}
          options={{
            title: "Cuenta",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function setIcon(route, routeStatus) {
  let iconName = "";
  switch (route.name) {
    case "product-stack":
      iconName = "home";
      break;
    case "favorites":
      iconName = "heart";
      break;
    case "cart":
      iconName = "shopping-cart";
      break;
    case "account-stack":
      iconName = "bars";
      break;

    default:
      break;
  }
  return <AwesomeIcon name={iconName} style={styles.icon} />;
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: colors.bgDark,
  },
  icon: {
    fontSize: 20,
    color: colors.fontLight,
  },
});
