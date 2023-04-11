import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { CLAVE_PUBLICABLE } from "../../utils/constans";
import { paymentCartApi, deleteCartApi } from "../../api/cart";
import useAuth from "../../hooks/useAuth";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

//const stripe = require("stripe-client")(STRIPE_CLAVE_PUBLICABLE_KEY);

var stripe = require("stripe-client")(
  "pk_test_51MtFbpKjqZPslUDTzRjfdFzzzncs46dUJxFNrmClXNAc9BMRpqPCf1MBkbXLQUAg8VSlN4HulnVN5qHv9wDnS22Z00yDBd7eKi"
);

//styles
import colors from "../../styles/colors";
import { formStyle } from "../../styles";

export default function CartPayment(props) {
  const { totalPayment, products, selectedAddress } = props;

  const navigation = useNavigation();

  // console.log("products", JSON.stringify(products, null, 4));
  // console.log("selectedAddress", selectedAddress);

  const [loading, setLoading] = useState(false);

  const { auth } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (FormData) => {
      setLoading(true);
      const result = await stripe.createToken({ card: FormData });
      //console.log("FormData", FormData);
      //console.log("result", JSON.stringify(result, null, 4));
      if (result?.error) {
        setLoading(false);
        Toast.show(result.error.message, {
          position: Toast.positions.CENTER,
        });
      } else {
        const response = await paymentCartApi(
          auth,
          result.id,
          products,
          selectedAddress
        );
        if (size(response) > 0) {
          await deleteCartApi();
          console.log("Eliminar carrito");
          navigation.navigate("account-stack", { screen: "orders" });
        } else {
          Toast.show("Error al realizar el pago", {
            position: Toast.positions.CENTER,
          });
          setLoading(false);
        }

        //console.log("response", JSON.stringify(response, null, 4));
        // Toast.show("Pago exitoso", {
        //   position: Toast.positions.CENTER,
        // });
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Forma de pago</Text>
      <TextInput
        label="Nombre de la terjeta"
        style={styles.containerInput}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Numero de la tarjeta"
        style={styles.containerInput}
        onChangeText={(text) => formik.setFieldValue("number", text)}
        value={formik.values.number}
        error={formik.errors.number}
      />

      <View style={styles.containerInputs}>
        <View style={styles.containerMonthYearInputs}>
          <TextInput
            label="Mes"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_month", text)}
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
          />
          <TextInput
            label="Año"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_year", text)}
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
          />
        </View>
        <TextInput
          label="CVV/CVC"
          style={styles.inputCvc}
          onChangeText={(text) => formik.setFieldValue("cvc", text)}
          value={formik.values.cvc}
          error={formik.errors.cvc}
        />
      </View>
      <Button
        mode="contained"
        style={styles.btnContent}
        labelStyle={styles.btnText}
        onPress={!loading && formik.handleSubmit}
        loading={loading}
      >
        PAGAR {totalPayment && `($${totalPayment})`}
      </Button>
    </View>
  );
}

const initialValues = () => {
  return {
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    name: "",
  };
};

const validationSchema = () => {
  return {
    number: Yup.string().min(4).max(16).required(true),
    exp_month: Yup.string().min(1).max(2).required(true),
    exp_year: Yup.string().min(1).max(2).required(true),
    cvc: Yup.string().min(3).max(3).required(true),
    name: Yup.string().min(4).max(18).required(true),
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBotton: 30,
  },
  containerTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  containerInput: {
    marginBottom: 10,
  },
  containerInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  containerMonthYearInputs: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  inputDate: {
    width: 100,
    marginRight: 10,
  },
  inputCvc: {
    width: "40%",
  },
  btnContent: {
    paddingVertical: 5,
    backgroundColor: colors.primary,
  },
  btnText: {
    fontSize: 18,
  },
});
