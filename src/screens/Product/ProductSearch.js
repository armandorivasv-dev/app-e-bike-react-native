import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { searchProductApi } from "../../api/search";
import StatusBarCustom from "../../components/StatusBarCustom";
import ScreenLoading from "../../components/ScreenLoading";
import Search from "../../components/Search/Search";
import SearchNotFound from "../../components/Search/SearchNotFound";

//styles
import colors from "../../styles/colors";
import SearchList from "../../components/Search/SearchList";

export default function ProductSearch(props) {
  const { route } = props;
  const { params } = route;

  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      setProducts(null);
      const response = await searchProductApi(params.search);
      setProducts(response.data);
      // console.log(JSON.stringify(response.data, null, 4));
    })();
  }, []);

  // console.log("products===>", JSON.stringify(products, null, 4));

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      <Search currentSearch={params.search} />
      {!products ? (
        <ScreenLoading text="Buscando Productos" />
      ) : products.length === 0 ? (
        <SearchNotFound search={params.search} />
      ) : (
        <SearchList products={products} />
      )}
    </>
  );
}
