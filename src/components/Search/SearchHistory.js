import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { map } from "lodash";
import { getHistotySearchApi } from "../../api/search";

//styles
import colors from "../../styles/colors";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

export default function SearchHistory(props) {
  const { showHistory, containerHeight, onSearch } = props;
  const [history, setHistory] = useState(null);

  useEffect(() => {
    if (showHistory) {
      (async () => {
        const reponse = await getHistotySearchApi();
        setHistory(reponse);
        // console.log(JSON.stringify(reponse, null, 4));
      })();
    }
  }, [showHistory]);

  return (
    <View
      style={[
        showHistory ? styles.history : styles.hidden,
        { top: containerHeight },
      ]}
    >
      {history &&
        map(history, (item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => onSearch(item.search)}
          >
            <View style={styles.historyItem}>
              <Text>{item.search}</Text>
              <AwesomeIcon name="arrow-right" size={16} />
            </View>
          </TouchableWithoutFeedback>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  history: {
    position: "absolute",
    backgroundColor: colors.bgLight,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  historyItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 0.2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
