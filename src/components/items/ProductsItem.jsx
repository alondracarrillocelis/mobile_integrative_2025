import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductsItem = ({ product, handleDelete }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // console.log("Edit product", product.id_product);
        navigation.navigate("AddProduct", { productId: product.id_product });
      }}
    >
      <View style={styles.tableRow}>
        {/* <Text style={styles.tableCell}>{product.id_product}</Text> */}
        <Text style={styles.tableCell}>{product.unit}</Text>
        <Text style={styles.tableCell}>{product.name_}</Text>
        <Text style={styles.tableCell}>{product.sale_price}</Text>
        <Text style={styles.tableCell}>{product.initial_stock}</Text>
        <Text style={styles.tableCell}>{product.supplier_id}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            // console.log("Deleting", product.id_product);
            handleDelete(product.id_product);
          }}
        >
          <Text style={styles.tableCell}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#c8e1ff",
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  deleteButton: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    color: "white",
  },
});

export default ProductsItem;
