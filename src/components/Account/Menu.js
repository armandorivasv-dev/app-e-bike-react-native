import { View, Text, StyleSheet, Alert } from "react-native";
import { List } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

export default function Menu(props) {
  const navigation = useNavigation();

  const { logout } = useAuth();

  const logoutAccount = () => {
    Alert.alert(
      "Cerrar sessión",
      "¿Estas seguro que quieres salir de tu cuenta?",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: logout,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <List.Section>
        <List.Subheader>Mi cuenta</List.Subheader>
        <List.Item
          title="Cambiar nombre"
          description="Cambia el nombre de tu cuenta"
          left={() => <List.Icon icon="face-man" {...props} />}
          onPress={() => navigation.navigate("change-name")}
        />
        <List.Item
          title="Cambiar email"
          description="Cambia el email de tu cuenta"
          left={() => <List.Icon icon="at" {...props} />}
          onPress={() => navigation.navigate("change-email")}
        />
        <List.Item
          title="Cambiar username"
          description="Cambia el nombre de usuario de tu cuenta"
          left={() => <List.Icon icon="face-man-shimmer" {...props} />}
          onPress={() => navigation.navigate("change-username")}
        />
        <List.Item
          title="Cambiar contraseña"
          description="Cambia ea contraseña de tu cuenta"
          left={() => <List.Icon icon="key" {...props} />}
          onPress={() => navigation.navigate("change-password")}
        />
        <List.Item
          title="Mis direcciones"
          description="Administra tus direcciones de envio"
          left={() => <List.Icon icon="map" {...props} />}
          onPress={() => navigation.navigate("address")}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>App</List.Subheader>
        <List.Item
          title="Pedidos"
          description="Listado de pedidos"
          left={() => <List.Icon icon="clipboard-list" {...props} />}
          onPress={() => console.log("Pedidos")}
        />
        <List.Item
          title="Lista favoritos"
          description="Listado de favoritos"
          left={() => <List.Icon icon="heart" {...props} />}
          onPress={() => navigation.navigate("favorites")}
        />
        <List.Item
          title="Cerrar sessión"
          description="Cierra esta sessión"
          left={() => <List.Icon icon="logout" {...props} />}
          onPress={logoutAccount}
        />
      </List.Section>
    </>
  );
}

const styles = StyleSheet.create({});
