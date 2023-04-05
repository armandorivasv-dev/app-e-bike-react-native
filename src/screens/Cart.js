import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import StatusBarCustom from "../components/StatusBarCustom";
import { getProductCartApi } from "../api/cart";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import { getAddressesApi } from "../api/address";
import useAuth from "../hooks/useAuth";
import ScreenLoading from "../components/ScreenLoading";
import CartNoProducts from "../components/Cart/CartNoProducts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CartList from "../components/Cart/CartList";
import CartAddressesList from "../components/Cart/CartAddressesList";

//styles
import colors from "../styles/colors";
import CartPayment from "../components/Cart/CartPayment";

export default function Cart() {
  const [cart, setCart] = useState(null);

  const [reloadCart, setReloadCart] = useState(false);

  const [products, setProducts] = useState(null);

  const [addresses, setAddresses] = useState(null);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [totalPayment, setTotalPayment] = useState(null);

  //console.log("totalPayment", totalPayment);

  const { auth } = useAuth();

  // console.log("reloadCart", reloadCart);

  // console.log("products", products);

  useFocusEffect(
    useCallback(() => {
      setCart(null); //para recargar
      setAddresses(null); //para recargar
      setSelectedAddress(null); //para recargar

      getProductCart();
      getAddresses();
    }, [])
  );

  useEffect(() => {
    if (reloadCart) {
      getProductCart();
      setReloadCart(false);
    }
  }, [reloadCart]);

  const getProductCart = async () => {
    const response = await getProductCartApi();
    setCart(response);
  };

  const getAddresses = async () => {
    const response = await getAddressesApi(auth);
    setAddresses(response.data);
  };

  // console.log("addresses", JSON.stringify(addresses, null, 4));

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      {!cart || size(cart) === 0 ? (
        <CartNoProducts />
      ) : (
        // KeyboardAwareScrollView: genera espacio ente el view y el teclado en formularios
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <ScrollView>
            <CartList
              cart={cart}
              products={products}
              setProducts={setProducts}
              setReloadCart={setReloadCart}
              setTotalPayment={setTotalPayment}
            />
          </ScrollView>
          <CartAddressesList
            addresses={addresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
          <CartPayment
            products={products}
            addresses={addresses}
            totalPayment={totalPayment}
            selectedAddress={selectedAddress}
          />
        </KeyboardAwareScrollView>
      )}
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
