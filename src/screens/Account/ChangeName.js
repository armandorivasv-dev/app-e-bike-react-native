import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getMeApi, updateUserApi } from "../../api/users";
import useAuth from "../../hooks/useAuth";
import Toast from "react-native-root-toast";

//styles
import { formStyle } from "../../styles";

export default function ChangeName() {
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        console.log("response --->", response);
        if (response.name && response.lastname) {
          await formik.setFieldValue("name", response.name);
          await formik.setFieldValue("lastname", response.lastname);
        }
      })();
    }, [])
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        await updateUserApi(auth, formData);
        navigation.goBack();
      } catch (error) {
        Toast.show("Error al actualizar los datos.", {
          position: Toast.positions.CENTER,
        });
        setLoading(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        label="Nombre"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Apellidos"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("lastname", text)}
        value={formik.values.lastname}
        error={formik.errors.lastname}
      />
      <Button
        mode="contained"
        style={formStyle.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar nombre y apellidos
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
