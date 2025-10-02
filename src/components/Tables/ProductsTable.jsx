import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Productsitem from "../items/ProductsItem";
import { useIsFocused } from "@react-navigation/native";
import { getProducts, deleteProduct } from "../../api/Products_api";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  // función para cargar los productos
  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products", error);
    } finally {
      setLoading(false);
    }
  };

  // efecto para cargar los productos cuando el componente se monta
  useEffect(() => {
    loadProducts();
  }, [isFocused]);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await loadProducts();
  };

  // función para renderizar cada ítem de la lista
  const renderItem = ({ item }) => {
    return <Productsitem product={item} handleDelete={handleDelete} />;
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.tableHeader}>
          {/* <Text style={styles.tableHeaderCell}>Código</Text> */}
          <Text style={styles.tableHeaderCell}>Unidad</Text>
          <Text style={styles.tableHeaderCell}>Nombre</Text>
          <Text style={styles.tableHeaderCell}>Precio</Text>
          <Text style={styles.tableHeaderCell}>Stock</Text>
          <Text style={styles.tableHeaderCell}>Proveedor</Text>
          <Text style={styles.tableHeaderCell}>Accion</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_product.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f8ff",
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default ProductsTable;
