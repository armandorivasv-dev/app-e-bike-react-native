import { View, Text } from "react-native";
import React from "react";
import Account from "../screens/Account/Account";
import { createStackNavigator } from "@react-navigation/stack";
import ChangeName from "../screens/Account/ChangeName";
import ChangeEmail from "../screens/Account/ChangeEmail";
import ChangeUsername from "../screens/Account/ChangeUsername";
import ChangePassword from "../screens/Account/ChangePassword";
import Address from "../screens/Account/Address";
import AddAddress from "../screens/Account/AddAddress";

//styles
import colors from "../styles/colors";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: {
          backgroundColor: colors.bgLight,
        },
      }}
    >
      <Stack.Screen
        name="account"
        component={Account}
        options={{
          title: "Cuenta",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="change-name"
        component={ChangeName}
        options={{
          title: "Cambiar nombre y apellidos",
        }}
      />
      <Stack.Screen
        name="change-email"
        component={ChangeEmail}
        options={{
          title: "Cambiar email",
        }}
      />
      <Stack.Screen
        name="change-username"
        component={ChangeUsername}
        options={{
          title: "Cambiar username",
        }}
      />
      <Stack.Screen
        name="change-password"
        component={ChangePassword}
        options={{
          title: "Cambiar password",
        }}
      />
      <Stack.Screen
        name="address"
        component={Address}
        options={{
          title: "Mis direcciones",
        }}
      />
      <Stack.Screen
        name="add-address"
        component={AddAddress}
        options={{
          title: "Agregar direccion",
        }}
      />
    </Stack.Navigator>
  );
}
