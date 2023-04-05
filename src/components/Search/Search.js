import { View, Text, StyleSheet, Keyboard, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AnimatedIcon,
  inputAnimationAction,
  inputAnimationWidth,
  animatedTransition,
  animatedTransitionReset,
  arrowAnimationAction,
} from "./SearchAnimation";
import SearchHistory from "./SearchHistory";

import { updateHistorySearchApi } from "../../api/search";

//styles
import colors from "../../styles/colors";

export default function Search(props) {
  const { currentSearch } = props;

  const [searchQuery, setSearchQuery] = useState(currentSearch || "");

  const [showHistory, setShowHistory] = useState(false);

  const [containerHeight, setContainerHeight] = useState(0);

  const onChangeSearch = (query) => setSearchQuery(query);

  const navigation = useNavigation();

  const route = useRoute();
  //console.log(route.name);

  const onSearch = async (reuseSearch) => {
    const isReuse = typeof reuseSearch === "string";

    closeSearch();

    !isReuse && updateHistorySearchApi(searchQuery);

    if (route.name === "product-search") {
      navigation.push("product-search", {
        search: isReuse ? reuseSearch : searchQuery,
      });
    } else {
      navigation.navigate("product-search", {
        search: isReuse ? reuseSearch : searchQuery,
      });
    }
  };

  const openSearch = () => {
    animatedTransition.start();
    setShowHistory(!showHistory);
  };

  const closeSearch = () => {
    animatedTransitionReset.start();
    Keyboard.dismiss();
    setShowHistory(!showHistory);
  };

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      <View style={styles.containerInput}>
        <AnimatedIcon
          name="arrow-left"
          size={20}
          style={[styles.backArrow, arrowAnimationAction]}
          onPress={closeSearch}
        />
        <Animated.View
          style={[inputAnimationAction, { width: inputAnimationWidth }]}
        >
          <Searchbar
            placeholder="Busca un producto aqui"
            onFocus={openSearch}
            onChangeText={onChangeSearch}
            onSubmitEditing={onSearch}
            value={searchQuery}
          />
        </Animated.View>
      </View>
      <SearchHistory
        showHistory={showHistory}
        containerHeight={containerHeight}
        onSearch={onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgDark,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  containerInput: {
    position: "relative",
    alignItems: "flex-end",
  },
  backArrow: {
    position: "absolute",
    left: 0,
    top: 15,
    color: colors.fontLight,
  },
});
