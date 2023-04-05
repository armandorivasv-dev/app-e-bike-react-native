import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
//import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addAddressApi,
  getAddressesApi,
  getAddressApi,
  updateAddressApi,
} from "../../api/address";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

//styles
import { formStyle } from "../../styles";

export default function AddAddress(props) {
  const {
    route: { params },
  } = props;

  const [loading, setLoading] = useState(false);

  const [newAddress, setNewAddress] = useState(true);

  const { auth } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (params?.idAddress) {
        setNewAddress(false);
        navigation.setOptions({ title: "Actualizar dirección" });
        const response = await getAddressApi(auth, params.idAddress);
        await formik.setFieldValue("id", response.data.id);
        await formik.setFieldValue("title", response.data.attributes.title);
        await formik.setFieldValue(
          "name_lastname",
          response.data.attributes.name_lastname
        );
        await formik.setFieldValue("address", response.data.attributes.address);
        await formik.setFieldValue(
          "postal_code",
          response.data.attributes.postal_code
        );
        await formik.setFieldValue("city", response.data.attributes.city);
        await formik.setFieldValue("state", response.data.attributes.state);
        await formik.setFieldValue("country", response.data.attributes.country);
        await formik.setFieldValue("phone", response.data.attributes.phone);
      }
    })();
  }, [params]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);

      try {
        if (newAddress) {
          await addAddressApi(auth, formData);
        } else {
          await updateAddressApi(auth, formData);
        }
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    },
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Agregar dirección</Text>
        <TextInput
          label="Titulo"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("title", text)}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <TextInput
          label="Nomnbre y apellidos"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("name_lastname", text)}
          value={formik.values.name_lastname}
          error={formik.errors.name_lastname}
        />
        <TextInput
          label="Dirección"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("address", text)}
          value={formik.values.address}
          error={formik.errors.address}
        />
        <TextInput
          label="Codigo postal"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("postal_code", text)}
          value={formik.values.postal_code}
          error={formik.errors.postal_code}
        />
        <TextInput
          label="Cuidad"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("city", text)}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <TextInput
          label="Estado"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("state", text)}
          value={formik.values.state}
          error={formik.errors.state}
        />
        <TextInput
          label="Pais"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("country", text)}
          value={formik.values.country}
          error={formik.errors.country}
        />
        <TextInput
          label="Telefono"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
        <Button
          mode="contained"
          style={formStyle.btnSucces}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          {newAddress ? "Crear dirección" : "Actualizar dirección"}
        </Button>
      </View>
    </ScrollView>
  );
}

function initialValues() {
  return {
    title: "",
    name_lastname: "",
    address: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name_lastname: Yup.string().required(true),
    address: Yup.string().required(true),
    postal_code: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    country: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
  },
});
