import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ServiceOrdersItem = ({ serviceOrder }) => {
  return (
    <TouchableOpacity>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{serviceOrder.id_service_order}</Text>
        <Text style={styles.tableCell}>{serviceOrder.scheduled_date}</Text>
        <Text style={styles.tableCell}>{serviceOrder.client_id}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            // console.log("Edit service order", serviceOrder.id_service_order);
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

export default ServiceOrdersItem;
