import { View, Text, ScrollView } from "react-native";
import React, { useState, useCallback } from "react";
import Search from "../../components/Search";
import StatusBarCustom from "../../components/StatusBarCustom";
import { getMeApi } from "../../api/users";
import useAuth from "../../hooks/useAuth";

//styles
import colors from "../../styles/colors";
import { useFocusEffect } from "@react-navigation/native";
import ScreenLoading from "../../components/ScreenLoading";
import UserInfo from "../../components/Account/UserInfo";

export default function Account() {
  const [user, setUser] = useState(null);

  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        setUser(response);
      })();
    }, [])
  );

  console.log("Account.js - user ---> ", user);

  return (
    <>
      <StatusBarCustom backgroundColor={colors.bgDark} />
      {!user ? (
        <ScreenLoading size="large" text="Cagando..." color="#f00" />
      ) : (
        <>
          <Search />
          <ScrollView>
            <UserInfo user={user} />
          </ScrollView>
        </>
      )}
    </>
  );
}
