import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import React, { useCallback, useState } from "react";
import { getMeApi, updateUserApi } from "../../api/users";
import useAuth from "../../hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";

//styles
import { formStyle } from "../../styles";

export default function ChangeUsername() {
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        await formik.setFieldValue("username", response.username);
      })();
    }, [])
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.error) throw "El nombre de usuario ya existe";
        navigation.goBack();
      } catch (error) {
        console.log(error);
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
        formik.setFieldError("username", true);
        setLoading(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        label="Nombre de usuario"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        error={formik.errors.username}
      />
      <Button
        mode="contained"
        style={formStyle.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar nombre de usuario
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    username: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
