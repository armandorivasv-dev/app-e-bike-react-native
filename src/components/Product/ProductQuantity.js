import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function ProductQuantity(props) {
  const { quantity, setQuantity } = props;

  //console.log(quantity);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
  ]);

  return (
    // <DropDownPicker
    //   items={[
    //     { label: "Apple", value: "apple" },
    //     { label: "Banana", value: "banana" },
    //   ]}
    //   defaultValue={"apple"}
    //   containerStyle={styles.containerStyle}
    // />

    <DropDownPicker
      open={open}
      value={quantity}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      listMode="SCROLLVIEW"
      defaultValue={1}
      onSelectItem={(item) => setQuantity(item.value)}
      containerStyle={styles.containerStyle}
    />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    width: 70,
  },
});
